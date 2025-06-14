import { execSync } from 'child_process';
import https from 'https';

const GITHUB_TOKEN = process.env.TOKEN;
const BREAKING_CHANGE = 'breaking change';
const FEAT = 'feat';
const FIX = 'fix';
const MAJOR = 'major';
const MINOR = 'minor';
const PATCH = 'patch';

function fetchGitHubUsername(email) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: `/search/users?q=${encodeURIComponent(email)}+in:email`,
      headers: {
        'User-Agent': 'Node.js',
        ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      },
    };

    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const login = json.items?.[0]?.login;
          const username = login ? `@${login}` : null;
          resolve(username);
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
  });
}

async function getCommitsSinceLastTag() {
  try {
    const lastTag = execSync(
      'git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD',
    )
      .toString()
      .trim();

    const commits = execSync(
      `git log ${lastTag}..HEAD --reverse --pretty=format:'%H%n%an%n%ae%n%s%n%b%n---' --no-merges`,
    )
      .toString()
      .split('---')
      .filter(Boolean);

    const enrichedCommits = await Promise.all(
      commits.map(async (commit) => {
        const [hash, name, email, subject, ...rest] = commit.trim().split('\n');
        const body = rest.join('\n').trim();
        const contributor = (await fetchGitHubUsername(email)) || name;

        const type =
          (/\bBREAKING CHANGES?\b/.test(body) &&
            /^(feat|fix)(\([^)]+\))?!?:/.test(subject)) ||
          /^(feat|fix)(\([^)]+\))?!:/.test(subject)
            ? BREAKING_CHANGE
            : /^feat(?:\([^)]+\))?:/.test(subject)
              ? FEAT
              : /^fix(?:\([^)]+\))?:/.test(subject)
                ? FIX
                : null;

        return type
          ? {
              hash: hash.slice(0, 7),
              contributor,
              subject: subject || '',
              body,
              type,
            }
          : null;
      }),
    );

    return enrichedCommits.filter(Boolean);
  } catch (error) {
    console.error('Error getting commits:', error);
    return [];
  }
}

function getVersionBump(commits) {
  let hasBreakingChange = false;
  let hasFeature = false;
  let hasFix = false;

  for (const commit of commits) {
    const { type } = commit;

    switch (type) {
      case BREAKING_CHANGE:
        hasBreakingChange = true;
        break;
      case FEAT:
        hasFeature = true;
        break;
      case FIX:
        hasFix = true;
        break;
    }
  }

  if (hasBreakingChange) return MAJOR;
  if (hasFeature) return MINOR;
  if (hasFix) return PATCH;
  return null;
}

async function bumpVersionAndPush(bumpType) {
  try {
    const newVersion = execSync(
      `npm version ${bumpType} -m "chore(release): v%s"`,
    )
      .toString()
      .trim();
    execSync('git push origin HEAD --tags');
    return newVersion;
  } catch (error) {
    console.error('Error updating version:', error);
    process.exit(1);
  }
}

function getRepositoryUrl() {
  try {
    let url = execSync('git remote get-url origin').toString().trim();
    if (url.startsWith('git@')) {
      // Convert SSH format to HTTPS
      url = url.replace(/^git@([^:]+):/, 'https://$1/').replace(/\.git$/, '');
    } else if (url.startsWith('https://') && url.endsWith('.git')) {
      // Remove .git suffix from HTTPS URL
      url = url.replace(/\.git$/, '');
    }
    return url;
  } catch (error) {
    console.error('Error getting repository URL:', error);
    return null;
  }
}

async function generateReleaseNotes(commits) {
  const url = await getRepositoryUrl();
  const generateMessage = (commit) => {
    const { hash, subject, contributor } = commit;
    return `- ${subject} ([${hash}](${url}/commit/${hash}))  ${contributor && `by ${contributor}`}`;
  };
  const breakingChanges = [];
  const features = [];
  const fixes = [];

  commits.forEach((commit) => {
    switch (commit.type) {
      case BREAKING_CHANGE:
        breakingChanges.push(generateMessage(commit));
        break;
      case FEAT:
        features.push(generateMessage(commit));
        break;
      case FIX:
        fixes.push(generateMessage(commit));
        break;
    }
  });

  return `${
    breakingChanges.length > 0
      ? `### BREAKING CHANGE\n${breakingChanges.join('\n')}\n`
      : ''
  }${features.length > 0 ? `### Feature\n${features.join('\n')}\n` : ''}${
    fixes.length > 0 ? `### Fix\n${fixes.join('\n')}\n` : ''
  }`;
}

async function writeVersionToOutput(newVersion, commits) {
  const outputFile = process.env.GITHUB_OUTPUT || process.env.GITHUB_ENV;
  if (!outputFile) {
    throw new Error('outputFile is required for version bump script');
  }

  const releaseNotes = await generateReleaseNotes(commits);

  const fs = await import('fs/promises');
  await fs.appendFile(outputFile, `newVersion=${newVersion}\n`, 'utf8');
  await fs.appendFile(
    outputFile,
    `releaseNotes<<EOF\n${releaseNotes}\nEOF\n`,
    'utf8',
  );
}

async function main() {
  if (process.env.GITHUB_ACTIONS !== 'true') {
    throw new Error('GITHUB_ACTIONS is not set');
  }
  try {
    const commits = await getCommitsSinceLastTag();
    if (commits.length === 0) {
      console.log('No new commits since last tag, skipping version bump');
      process.exit(0);
    } else {
      const bumpType = getVersionBump(commits);
      if (bumpType === null) {
        console.log('No version change needed, skipping version bump');
        process.exit(0);
      }
      const newVersion = await bumpVersionAndPush(bumpType);
      await writeVersionToOutput(newVersion, commits);
      process.exit(0);
    }
  } catch (error) {
    console.error(
      'Failed to determine version bump type from commit messages:',
      error,
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

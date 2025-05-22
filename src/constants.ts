const MILLISECONDS = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 ** 2,
  day: 1000 * 60 ** 2 * 24,
  week: 1000 * 60 ** 2 * 24 * 7,
} as const;

export { MILLISECONDS };

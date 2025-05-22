import { MILLISECONDS } from '../constants';
import { isValidDate } from './is-valid-date';
import { _normalizeWeekStart } from './_normalize-week-start';
import { getAdjustedDay } from './get-adjusted-day';
import { adjust } from './adjust';

/**
 * GetYearWeekOptions for customizing the week calculation in the `getYearWeek` function.
 *
 * @property weekStart - The first day of the week, represented as an index:
 *                      - `0`: Sunday
 *                      - `1`: Monday
 *                      - `2`: Tuesday
 *                      - `3`: Wednesday
 *                      - `4`: Thursday
 *                      - `5`: Friday
 *                      - `6`: Saturday
 *                      Defaults to `0` (Sunday).
 *
 * @property mode - The mode of week calculation:
 *                - `0`: Weeks start from the first occurrence of `weekStart` after January 1st.
 *                - `1`: Weeks starting with January 1st are included if they contain at least 4 days of the new year (ISO-like).
 *                Defaults to `0`.
 *
 * @property format - The format to use for representing the year and week. See {@link YearWeekFormat}.
 */
type GetYearWeekOptions<T extends YearWeekFormat | undefined = undefined> =
  (T extends undefined ? object : { format: T }) & {
    weekStart?: number;
    mode?: number;
  };

type GetYearWeekReturn<T extends YearWeekFormat | undefined = undefined> =
  T extends undefined ? YearWeekObject : string;
/**
 * Represents the various formats for representing a year and week.
 *
 * This type allows different formats for representing a year, week number, and optionally a weekday number.
 * It can be used to flexibly format dates in different week-based representations, accommodating ISO standards or custom formats.
 *
 * @example
 * // Examples of formats:
 * - `'YYYY-ww'`: Represents the year and two-digit week number (e.g., `'2024-03'`).
 * - `'YYYY-Www-D'`: Represents the year, week number with 'W' prefix, and day of the week (e.g., `'2024-W03-3'`).
 * - `'Www'`: Represents the week number only, prefixed by 'W' (e.g., `'W03'`).
 * - `'w'`: Represents a single-digit week number without any prefix (e.g., `'3'`).
 */
type YearWeekFormat =
  | `${YearFormat}-${WeekFormat}`
  | `${YearFormat}${WeekFormat}`
  | `${YearFormat}-${WeekFormat}-D`
  | `${YearFormat}${WeekFormat}D`
  | `${WeekFormat}`;

type YearFormat = 'YYYY';
type WeekFormat = 'Www' | 'ww' | 'Ww' | 'w';

type YearWeekObject = {
  weekYear: number;
  weekNumber: number;
  weekday: number; // 1-7
};

/**
 * Returns a formatted string representing the year and week number for a given date.
 *
 * This function calculates the week number of the year for a given date, based on the specified
 * week start day and formatting options. The week number calculation can follow different modes
 * to determine how weeks are assigned at the beginning of the year, accommodating ISO-like or custom rules.
 *
 * @param date - The date for which the year-week representation is calculated.
 * @param options - Optional parameters to customize the week calculation.
 *                  - `weekStart`: The first day of the week (0 = Sunday, 6 = Saturday). Default is `0` (Sunday).
 *                  - `mode`: The mode of week calculation.
 *                      - `0`: Weeks start from the first occurrence of `weekStart` after January 1st.
 *                      - `1`: Weeks starting with January 1st are included if they contain at least 4 days of the new year (ISO-like).
 *                  - `format`: The output format for representing year and week. Default is `'YYYY-ww'`.
 *                  See {@link GetYearWeekOptions} for more details.
 *
 * @returns A string representing the formatted year and week number according to the specified format.
 *
 * @description
 * The function operates in the following steps:
 * 1. Normalizes the date by setting the time to midnight and applying the freezeDate operation.
 * 2. Determines the week to which the given date belongs based on `weekStart`, `mode`, and `format` options.
 * 3. Computes the year and week number according to the provided `format`. See {@link YearWeekFormat} for format options.
 *
 * @example
 * // Basic usage with default options
 * getYearWeek(new Date('2024-01-15'));
 * // Output: '2024-03' (if 'YYYY-ww' format is default)
 *
 * @example
 * // Using a custom week start (Monday) and ISO-like mode
 * getYearWeek(new Date('2024-01-15'), { weekStart: 1, mode: 1 });
 * // Output: '2024-W03-1' (depending on the specified format)
 */
// function getYearWeek(date: Date, options?: YearWeekOptionsBase): YearWeekObject;
// function getYearWeek(date: Date, options: YearWeekOptionsWithFormat): string;
// function getYearWeek(
//   date: Date,
//   { weekStart = 0, mode = 0, format }: YearWeekOptions = {}

function getYearWeek<T extends YearWeekFormat | undefined = undefined>(
  date: Date,
  options?: GetYearWeekOptions<T>,
): GetYearWeekReturn<T> {
  let weekStart = options?.weekStart ?? 0;
  const mode = options?.mode ?? 0;
  const format = options && 'format' in options ? options.format : undefined;

  // 1. validate date
  if (!isValidDate(date)) {
    throw new Error(`Invalid date: ${date}`);
  }

  // 2. normalize date's hours and weekNumber
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  weekStart = _normalizeWeekStart(weekStart);

  // 3. initialize jan1 & adjust it to the correct year
  let jan1 = new Date(date);
  jan1.setMonth(0, 1);

  if (_isLastWeekOfLastYear(date, weekStart, mode)) {
    jan1 = adjust(jan1, -1, 'year');
  } else if (_isFirstWeekOfNextYear(date, weekStart, mode)) {
    jan1 = adjust(jan1, 1, 'year');
  }

  // 4. normalize jan1's dayIndex
  const normalizedJan1DayIndex = getAdjustedDay(jan1, weekStart);

  // 5. initialize firstWeekNumberDate
  let firstWeekNumberDate: Date;
  if (_isLastWeekOfLastYear(jan1, weekStart, mode)) {
    firstWeekNumberDate = adjust(jan1, 7 - normalizedJan1DayIndex, 'day');
  } else {
    firstWeekNumberDate = adjust(jan1, -normalizedJan1DayIndex, 'day');
  }

  // 6. weekYear, weekNumber and weekday
  const weekYear = jan1.getFullYear();
  const weekNumber = Math.floor(
    Math.abs(date.getTime() - firstWeekNumberDate.getTime()) /
      MILLISECONDS.day /
      7 +
      1,
  );
  const weekday = getAdjustedDay(date, weekStart) + 1;

  if (typeof format === 'undefined') {
    return {
      weekYear,
      weekNumber,
      weekday,
    } as GetYearWeekReturn<T>;
  } else {
    return format
      .replace('YYYY', String(weekYear))
      .replace('ww', String(weekNumber).padStart(2, '0'))
      .replace('w', String(weekNumber))
      .replace('D', String(weekday)) as GetYearWeekReturn<T>;
  }
}

/**
 * Checks if the first week of January belongs to the last week of the previous year.
 *
 * This function checks if the given date belongs to the last week of the previous year,
 * based on customizable options for the starting day of the week (`weekStart`) and a `mode`
 * parameter that influences the week boundaries. It considers whether a date in January is
 * effectively part of the previous year's last week.
 *
 * @param date - The date to be checked.
 * @param weekStart - The starting day of the week, represented as an index (0 for Sunday, 1 for Monday, etc.). Defaults to 0 (Sunday).
 * @param mode - Determines how the week boundary is calculated:
 *               - `0`: The first day of the week is `weekStart`. Weeks start from the first occurrence of `weekStart` after January 1st.
 *               - `1`: Weeks that start with January 1st are included as part of the last week of the previous year if they contain fewer than 4 days of the current year.
 *               Defaults to `0`.
 * @returns `true` if the date is part of the last week of the previous year, `false` otherwise.
 *
 * @description
 * The function operates in the following steps:
 * 1. If the month is not January, it returns `false` immediately, as the date cannot be part of the last week of the previous year.
 * 2. Checks if the given date belongs to the first week of January, based on the `weekStart` day index.
 * 3. Depending on the `mode` parameter:
 *    - **Mode 0**: If January 1st is not the specified `weekStart`, and the date falls within the first week of January, then it is treated as belonging to the last week of the previous year.
 *    - **Mode 1**: If January 1st is in the middle of the week (i.e., fewer than 4 days belong to the new year), and the date falls within the first week of January, then it is treated as part of the last week of the previous year.
 *
 * @example
 * // Example 1: Assuming the week starts on Sunday (0) and using mode 0
 * _isLastWeekOfLastYear(new Date(2024, 0, 1), 0, 0); // false
 * _isLastWeekOfLastYear(new Date(2024, 0, 3), 0, 0); // true (if January 1st is a Tuesday)
 *
 * @example
 * // Example 2: Assuming the week starts on Monday (1) and using mode 1
 * _isLastWeekOfLastYear(new Date(2024, 0, 2), 1, 1); // true (depending on the normalized day index)
 */
function _isLastWeekOfLastYear(date: Date, weekStart = 0, mode = 0): boolean {
  // 1. check if date is not in January and 1-7
  if (date.getMonth() !== 0 || date.getDate() > 7) return false;
  // 2. initialize January first
  const jan1 = new Date(date);
  jan1.setMonth(0, 1);
  jan1.setHours(0, 0, 0, 0);

  // 3. get normalized day index of January first
  const normalizedJan1DayIndex = getAdjustedDay(jan1, weekStart);
  // 4. get max allowed date
  const maxAllowedDate = 7 - normalizedJan1DayIndex;
  // 5. check if date is after max allowed date
  if (date.getDate() > maxAllowedDate) return false;
  // 6. mode
  switch (mode) {
    case 0:
      return normalizedJan1DayIndex !== 0;
    case 1: // if jan1 is more than 3 days into the year, it is last week of last year
      return normalizedJan1DayIndex > 3;
    // case 2: // Add new mode here
    //   return /* new logic */;
    default:
      return false;
  }
}

/**
 * Determines if a given date falls within the first week of the next year.
 *
 * This function checks if the given date in December is part of the first week of the following year,
 * based on customizable options for the starting day of the week (`weekStart`) and a `mode` parameter
 * that influences the week boundaries.
 *
 * @param date - The date to be checked.
 * @param weekStart - The starting day of the week, represented as an index (0 for Sunday, 1 for Monday, etc.). Defaults to 0 (Sunday).
 * @param mode - Determines how the week boundary is calculated:
 *               - `0`: The first day of the week is `weekStart`. December days are included in the current year unless they belong to a full week of the next year.
 *               - `1`: Weeks that contain fewer than 4 days of the next year are treated as part of the current year.
 *               Defaults to `0`.
 * @returns `true` if the date is part of the first week of the next year, `false` otherwise.
 *
 * @description
 * The function operates in the following steps:
 * 1. If the month is not December, it returns `false` immediately, as the date cannot be part of the next year's first week.
 * 2. Checks if the given date in December belongs to the first week of the next year based on the `weekStart` day index.
 * 3. Depending on the `mode` parameter:
 *    - **Mode 0**: If the date belongs to a full week starting from `weekStart` that is mostly in January, it is treated as part of the next year.
 *    - **Mode 1**: If the last week of December has fewer than 4 days in January, it is treated as part of the current year.
 *
 * @example
 * // Example 1: Assuming the week starts on Sunday (0) and using mode 0
 * _isFirstWeekOfNextYear(new Date(2023, 11, 31), 0, 0); // false
 *
 * @example
 * // Example 2: Assuming the week starts on Monday (1) and using mode 1
 * _isFirstWeekOfNextYear(new Date(2023, 11, 29), 1, 1); // true (depending on the normalized day index)
 */
function _isFirstWeekOfNextYear(date: Date, weekStart = 0, mode = 0): boolean {
  // 1. check if date is after December 25-31 and mode is not 0
  // 📝 in mode 0, date always belongs to last week of current year
  if (date.getMonth() !== 11 || date.getDate() < 25 || mode === 0) {
    return false;
  }
  // 2. initialize December 31
  const dec31 = adjust(date, 1, 'year');
  dec31.setMonth(0, 0);
  dec31.setHours(0, 0, 0, 0);

  // 3. get normalized day index of December 31
  const normalizedDec31DayIndex = getAdjustedDay(dec31, weekStart); //getAdjustedDay(dec31, weekStart);
  // 4. get min allowed date
  const minAllowedDate = 31 - normalizedDec31DayIndex;
  // 5. check if date is after min allowed date
  if (date.getDate() < minAllowedDate) return false;

  // 6. mode
  switch (mode) {
    // case 0: // mode 0 does not need to check anything.
    //   return false;
    case 1:
      return normalizedDec31DayIndex < 3;
    default:
      return false;
  }
}

export { getYearWeek };
export type {
  YearWeekFormat,
  YearWeekObject,
  GetYearWeekOptions,
  GetYearWeekReturn,
};

import { getNumericDateFormat } from './get-numeric-date-format';
import type { DateUnit } from '../types';
import { isValidDate } from './is-valid-date';

type Inclusivity = '()' | '[]' | '[)' | '(]';

/**
 * Checks if a date is between two other dates with customizable inclusivity
 * @param date - The date to check
 * @param min - The start of the date range
 * @param max - The end of the date range
 * @param unit - The unit of time to compare (default: 'millisecond')
 * @param inclusivity - Controls the boundary comparison:
 *   - '()' - Neither min nor max is included (exclusive)
 *   - '[]' - Both min and max are included (inclusive)
 *   - '[)' - Min is included, max is excluded
 *   - '(]' - Min is excluded, max is included
 * @returns {boolean} True if the date is within the specified range according to the inclusivity rules
 * @throws {Error} If any of the provided dates are invalid
 * @example
 * // Check if date is between Jan 2 and Jan 4 (exclusive)
 * isBetween(new Date('2023-01-03'), new Date('2023-01-02'), new Date('2023-01-04'), 'day', '()'); // true
 *
 * @example
 * // Check if date is between Jan 1 and Jan 31 (inclusive)
 * isBetween(new Date('2023-01-31'), new Date('2023-01-01'), new Date('2023-01-31'), 'day', '[]'); // true
 */
function isBetween(
  date: Date,
  min: Date,
  max: Date,
  unit: DateUnit = 'millisecond',
  inclusivity: Inclusivity = '()',
): boolean {
  if (!isValidDate(date)) {
    throw new Error(`Invalid date ${date}`);
  }
  if (!isValidDate(min)) {
    throw new Error(`Invalid min ${min}`);
  }
  if (!isValidDate(max)) {
    throw new Error(`Invalid max ${max}`);
  }

  const normalized = {
    date: getNumericDateFormat(date, unit),
    min: getNumericDateFormat(min, unit),
    max: getNumericDateFormat(max, unit),
  };

  const isMinIncluded = inclusivity[0] === '[';
  const isMaxIncluded = inclusivity[1] === ']';

  const minCheck = isMinIncluded
    ? normalized.date >= normalized.min
    : normalized.date > normalized.min;

  const maxCheck = isMaxIncluded
    ? normalized.date <= normalized.max
    : normalized.date < normalized.max;

  return minCheck && maxCheck;
}

export { isBetween };

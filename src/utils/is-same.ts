import { getNumericDateFormat } from './get-numeric-date-format';
import type { DateUnit } from '../types';
import { isValidDate } from './is-valid-date';

function isSame(
  date1: Date,
  date2: Date,
  unit: DateUnit = 'millisecond',
): boolean {
  if (!isValidDate(date1)) {
    throw new Error(`Invalid date1 ${date1}`);
  }
  if (!isValidDate(date2)) {
    throw new Error(`Invalid date2 ${date2}`);
  }
  return (
    getNumericDateFormat(date1, unit) === getNumericDateFormat(date2, unit)
  );
}

export { isSame };

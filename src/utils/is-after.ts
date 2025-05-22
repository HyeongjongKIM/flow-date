import { getNumericDateFormat } from './get-numeric-date-format';
import { isValidDate } from './is-valid-date';
import type { DateUnit } from '../types';

function isAfter(
  target: Date,
  compareDate: Date,
  unit: DateUnit = 'millisecond',
): boolean {
  if (!isValidDate(target)) {
    throw new Error(`Invalid target: ${target}`);
  }
  if (!isValidDate(compareDate)) {
    throw new Error(`Invalid compareDate: ${compareDate}`);
  }

  const normalizedTarget = getNumericDateFormat(target, unit);
  const normalizedCompare = getNumericDateFormat(compareDate, unit);

  return normalizedTarget > normalizedCompare;
}

export { isAfter };

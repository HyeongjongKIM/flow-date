import { getNumericDateFormat } from './get-numeric-date-format';
import type { DateUnit } from '../types';
import { isValidDate } from './is-valid-date';

function isBefore(
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

  return normalizedTarget < normalizedCompare;
}

export { isBefore };

import type { DateUnit } from '../types';
import { isValidDate } from './is-valid-date';

function getNumericDateFormat(
  date: Date,
  unit: DateUnit = 'millisecond',
): number {
  if (!isValidDate(date)) {
    throw new Error(`Invalid date ${date}}`);
  }

  if (unit === 'millisecond') {
    return date.getTime();
  }

  if (unit === 'year') {
    return date.getFullYear();
  }

  const unitIndex = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
  ].findIndex((u) => u === unit);

  let result = '';
  const compareFns = [
    (d: Date): string => String(d.getFullYear()),
    (d: Date): string => String(d.getMonth() + 1).padStart(2, '0'),
    (d: Date): string => String(d.getDate()).padStart(2, '0'),
    (d: Date): string => String(d.getHours()).padStart(2, '0'),
    (d: Date): string => String(d.getMinutes()).padStart(2, '0'),
    (d: Date): string => String(d.getSeconds()).padStart(2, '0'),
  ] as const;

  for (let i = 0; i <= unitIndex; i++) {
    result += compareFns[i](date);
  }

  return Number(result);
}

export { getNumericDateFormat };

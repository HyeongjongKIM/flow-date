import { MILLISECONDS } from '../constants';
import type { DateUnit } from '../types';
import { isValidDate } from './is-valid-date';

function diff(
  laterDate: Date,
  earlierDate: Date,
  unit: DateUnit | 'week',
): number {
  if (!isValidDate(laterDate) || !isValidDate(earlierDate)) {
    throw new Error('Invalid date');
  }

  const d1 = new Date(laterDate).getTime();
  const d2 = new Date(earlierDate).getTime();

  const diffInMS = d1 - d2;

  switch (unit) {
    case 'year':
      return laterDate.getFullYear() - earlierDate.getFullYear();
    case 'month':
      return (
        (laterDate.getFullYear() - earlierDate.getFullYear()) * 12 +
        (laterDate.getMonth() - earlierDate.getMonth())
      );
    case 'week':
      return diffInMS / MILLISECONDS.week;
    case 'day':
      return diffInMS / MILLISECONDS.day;
    case 'hour':
      return diffInMS / MILLISECONDS.hour;
    case 'minute':
      return diffInMS / MILLISECONDS.minute;
    case 'second':
      return diffInMS / MILLISECONDS.second;
    case 'millisecond':
      return diffInMS;
  }
}

export { diff };

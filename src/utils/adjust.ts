import type { JSDateGetMethod, JSDateSetMethod, DateUnit } from '../types';
import { isValidDate } from './is-valid-date';

function adjust(
  date: Date,
  amount: number,
  unit: DateUnit = 'millisecond',
): Date {
  if (!isValidDate(date)) {
    throw new Error(`Invalid date ${date}`);
  }
  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid amount ${amount}`);
  }
  if (amount === 0) {
    return new Date(date);
  }

  const clone = new Date(date);

  const methods: Record<DateUnit, [JSDateSetMethod, JSDateGetMethod]> = {
    year: ['setFullYear', 'getFullYear'],
    month: ['setMonth', 'getMonth'],
    day: ['setDate', 'getDate'],
    hour: ['setHours', 'getHours'],
    minute: ['setMinutes', 'getMinutes'],
    second: ['setSeconds', 'getSeconds'],
    millisecond: ['setMilliseconds', 'getMilliseconds'],
  };

  const [set, get] = methods[unit];
  clone[set](date[get]() + amount);

  if (unit === 'month' || unit === 'year') {
    const originalDate = date.getDate();
    if (clone.getDate() < originalDate) {
      clone.setDate(0);
    }
  }
  return clone;
}

export { adjust };

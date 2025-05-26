import { _getPositiveModulo } from './_get-positive-modulo';
import { adjust } from './adjust';
import { getAdjustedDay } from './get-adjusted-day';

function getDateFromYearWeek(
  year: number,
  weekNumber: number,
  {
    day = 0,
    weekStart = 0,
    mode = 0,
  }: { day?: number; weekStart?: number; mode?: number } = {},
): Date {
  day = _getPositiveModulo(day, 7);
  weekStart = _getPositiveModulo(weekStart, 7);
  mode = _getPositiveModulo(mode, 2);

  let date = new Date(Date.UTC(year, 0, 1));
  const dayIndex = getAdjustedDay(date, weekStart);

  switch (mode) {
    case 0:
      date = adjust(date, -dayIndex, 'day');
      weekNumber += year - date.getFullYear();
      break;
    case 1:
      date = adjust(date, dayIndex > 3 ? 7 - dayIndex : -dayIndex, 'day');
      break;
    // case 2:
    //     return /* new logic */;
  }

  date = adjust(date, 7 * (weekNumber - 1), 'day');
  date = adjust(date, day, 'day');

  return date;
}

export { getDateFromYearWeek };

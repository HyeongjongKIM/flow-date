import { _getPositiveModulo } from './_get-positive-modulo';

const getAdjustedDay = (date: Date, weekStart = 0): number =>
  (date.getDay() - _getPositiveModulo(weekStart, 7) + 7) % 7;

export { getAdjustedDay };

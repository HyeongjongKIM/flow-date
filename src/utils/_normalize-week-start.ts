import { _getPositiveModulo } from './_get-positive-modulo';

const _normalizeWeekStart = (value: number): number =>
  _getPositiveModulo(value, 7);

export { _normalizeWeekStart };

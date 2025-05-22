import { _getPositiveModulo } from './_get-positive-modulo';

describe('_getPositiveModulo', () => {
  test('positive number modulo returns expected remainder', () => {
    expect(_getPositiveModulo(7, 3)).toBe(1);
    expect(_getPositiveModulo(8, 4)).toBe(0);
    expect(_getPositiveModulo(10, 3)).toBe(1);
  });

  test('negative number modulo returns positive remainder', () => {
    expect(_getPositiveModulo(-7, 3)).toBe(2);
    expect(_getPositiveModulo(-8, 4)).toBe(0);
    expect(_getPositiveModulo(-10, 3)).toBe(2);
  });

  test('handles zero input correctly', () => {
    expect(_getPositiveModulo(0, 5)).toBe(0);
    expect(_getPositiveModulo(0, 3)).toBe(0);
  });

  test('avoids negative zero result', () => {
    const result = _getPositiveModulo(0, 4);
    expect(Object.is(result, -0)).toBe(false);
    expect(Object.is(result, 0)).toBe(true);
  });
});

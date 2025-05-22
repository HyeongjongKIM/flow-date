import { _normalizeWeekStart } from './_normalize-week-start';

describe('_normalizeWeekStart', () => {
  test('should return the same number for values between 0 and 6', () => {
    expect(_normalizeWeekStart(0)).toBe(0);
    expect(_normalizeWeekStart(3)).toBe(3);
    expect(_normalizeWeekStart(6)).toBe(6);
  });

  test('should normalize numbers greater than 6', () => {
    expect(_normalizeWeekStart(7)).toBe(0);
    expect(_normalizeWeekStart(8)).toBe(1);
    expect(_normalizeWeekStart(13)).toBe(6);
  });

  test('should normalize negative numbers', () => {
    expect(_normalizeWeekStart(-1)).toBe(6);
    expect(_normalizeWeekStart(-7)).toBe(0);
    expect(_normalizeWeekStart(-8)).toBe(6);
  });
});

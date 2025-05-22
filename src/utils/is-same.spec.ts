import { isSame } from './is-same';

describe('isSame', () => {
  it('should return true for dates with the same year', () => {
    const date1 = new Date(2024, 0, 1);
    const date2 = new Date(2024, 11, 31);
    expect(isSame(date1, date2, 'year')).toBe(true);
  });

  it('should return false for dates with different years', () => {
    const date1 = new Date(2023, 0, 1);
    const date2 = new Date(2024, 0, 1);
    expect(isSame(date1, date2, 'year')).toBe(false);
  });

  it('should return true for dates with the same month', () => {
    const date1 = new Date(2024, 5, 1);
    const date2 = new Date(2024, 5, 15);
    expect(isSame(date1, date2, 'month')).toBe(true);
  });

  it('should return false for dates with different months', () => {
    const date1 = new Date(2024, 4, 1);
    const date2 = new Date(2024, 5, 1);
    expect(isSame(date1, date2, 'month')).toBe(false);
  });

  it('should return true for dates with the same day', () => {
    const date1 = new Date(2024, 5, 10, 10);
    const date2 = new Date(2024, 5, 10, 15);
    expect(isSame(date1, date2, 'day')).toBe(true);
  });

  it('should return false for dates with different days', () => {
    const date1 = new Date(2024, 5, 10);
    const date2 = new Date(2024, 5, 11);
    expect(isSame(date1, date2, 'day')).toBe(false);
  });

  it('should return true for dates with the same hour', () => {
    const date1 = new Date(2024, 5, 10, 10);
    const date2 = new Date(2024, 5, 10, 10, 30);
    expect(isSame(date1, date2, 'hour')).toBe(true);
  });

  it('should return false for dates with different hours', () => {
    const date1 = new Date(2024, 5, 10, 10);
    const date2 = new Date(2024, 5, 10, 11);
    expect(isSame(date1, date2, 'hour')).toBe(false);
  });

  it('should return true for dates with the same minute', () => {
    const date1 = new Date(2024, 5, 10, 10, 30);
    const date2 = new Date(2024, 5, 10, 10, 30, 45);
    expect(isSame(date1, date2, 'minute')).toBe(true);
  });

  it('should return false for dates with different minutes', () => {
    const date1 = new Date(2024, 5, 10, 10, 30);
    const date2 = new Date(2024, 5, 10, 10, 31);
    expect(isSame(date1, date2, 'minute')).toBe(false);
  });

  it('should return true for dates with the same second', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45);
    const date2 = new Date(2024, 5, 10, 10, 30, 45, 500);
    expect(isSame(date1, date2, 'second')).toBe(true);
  });

  it('should return false for dates with different seconds', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45);
    const date2 = new Date(2024, 5, 10, 10, 30, 46);
    expect(isSame(date1, date2, 'second')).toBe(false);
  });

  it('should return true for dates with the same millisecond', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45, 500);
    const date2 = new Date(2024, 5, 10, 10, 30, 45, 500);
    expect(isSame(date1, date2, 'millisecond')).toBe(true);
  });

  it('should return false for dates with different milliseconds', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45, 500);
    const date2 = new Date(2024, 5, 10, 10, 30, 45, 501);
    expect(isSame(date1, date2, 'millisecond')).toBe(false);
  });
});

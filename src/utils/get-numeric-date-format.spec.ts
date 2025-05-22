import { getNumericDateFormat } from './get-numeric-date-format';

describe('getNumericDateFormat', () => {
  it('should return milliseconds when unit is millisecond', () => {
    const date = new Date('2024-03-15T10:30:45.123');
    expect(getNumericDateFormat(date, 'millisecond')).toBe(date.getTime());
  });

  it('should return year when unit is year', () => {
    const date = new Date('2024-03-15T10:30:45.123');
    expect(getNumericDateFormat(date, 'year')).toBe(2024);
  });

  it('should return concatenated numeric value up to specified unit', () => {
    const date = new Date('2024-03-15T10:30:45.123');
    expect(getNumericDateFormat(date, 'month')).toBe(202403);
    expect(getNumericDateFormat(date, 'day')).toBe(20240315);
    expect(getNumericDateFormat(date, 'hour')).toBe(2024031510);
    expect(getNumericDateFormat(date, 'minute')).toBe(202403151030);
    expect(getNumericDateFormat(date, 'second')).toBe(20240315103045);
  });

  it('should throw error for invalid date', () => {
    const invalidDate = new Date('invalid');
    expect(() => getNumericDateFormat(invalidDate)).toThrow('Invalid date');
  });

  it('should use millisecond as default unit', () => {
    const date = new Date('2024-03-15T10:30:45.123');
    expect(getNumericDateFormat(date)).toBe(date.getTime());
  });
});

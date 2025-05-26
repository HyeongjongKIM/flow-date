import { isBetween } from './is-between';

describe('isBetween', () => {
  const baseDate = new Date('2024-01-15');
  const minDate = new Date('2024-01-10');
  const maxDate = new Date('2024-01-20');

  it('should return true when date is between min and max with default inclusivity', () => {
    expect(isBetween(baseDate, minDate, maxDate)).toBe(true);
  });

  it('should return false when date equals min with default inclusivity ()', () => {
    expect(isBetween(minDate, minDate, maxDate)).toBe(false);
  });

  it('should return false when date equals max with default inclusivity ()', () => {
    expect(isBetween(maxDate, minDate, maxDate)).toBe(false);
  });

  it('should return true when date equals boundaries with inclusivity []', () => {
    expect(isBetween(minDate, minDate, maxDate, 'millisecond', '[]')).toBe(
      true,
    );
    expect(isBetween(maxDate, minDate, maxDate, 'millisecond', '[]')).toBe(
      true,
    );
  });

  it('should handle different units correctly', () => {
    const dateInHour = new Date('2024-01-15T10:30:00');
    const minHour = new Date('2024-01-15T10:00:00');
    const maxHour = new Date('2024-01-15T11:00:00');

    expect(isBetween(dateInHour, minHour, maxHour, 'hour')).toBe(false);
    expect(isBetween(dateInHour, minHour, maxHour, 'minute')).toBe(true);
  });

  it('should throw error for invalid dates', () => {
    const invalidDate = new Date('invalid');

    expect(() => isBetween(invalidDate, minDate, maxDate)).toThrow(
      'Invalid date',
    );
    expect(() => isBetween(baseDate, invalidDate, maxDate)).toThrow(
      'Invalid min',
    );
    expect(() => isBetween(baseDate, minDate, invalidDate)).toThrow(
      'Invalid max',
    );
  });
});

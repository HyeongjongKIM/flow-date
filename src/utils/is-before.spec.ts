import { isBefore } from './is-before';

describe('isBefore', () => {
  it('should return true when target date is before compare date', () => {
    const target = new Date('2024-01-01');
    const compareDate = new Date('2024-01-02');
    expect(isBefore(target, compareDate)).toBe(true);
  });

  it('should return false when target date is after compare date', () => {
    const target = new Date('2024-01-02');
    const compareDate = new Date('2024-01-01');
    expect(isBefore(target, compareDate)).toBe(false);
  });

  it('should return false when dates are equal', () => {
    const target = new Date('2024-01-01');
    const compareDate = new Date('2024-01-01');
    expect(isBefore(target, compareDate)).toBe(false);
  });

  it('should compare by specified unit (day)', () => {
    const target = new Date('2024-01-01 23:59:59');
    const compareDate = new Date('2024-01-02 00:00:00');
    expect(isBefore(target, compareDate, 'day')).toBe(true);
  });

  it('should throw error for invalid target date', () => {
    const target = new Date('invalid');
    const compareDate = new Date();
    expect(() => isBefore(target, compareDate)).toThrow('Invalid target');
  });

  it('should throw error for invalid compare date', () => {
    const target = new Date();
    const compareDate = new Date('invalid');
    expect(() => isBefore(target, compareDate)).toThrow('Invalid compareDate');
  });
});

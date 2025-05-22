import { isAfter } from './is-after';

describe('isAfter', () => {
  it('should return true when target date is after compare date', () => {
    const target = new Date('2024-03-15');
    const compareDate = new Date('2024-03-14');
    expect(isAfter(target, compareDate)).toBe(true);
  });

  it('should return false when target date is before compare date', () => {
    const target = new Date('2024-03-14');
    const compareDate = new Date('2024-03-15');
    expect(isAfter(target, compareDate)).toBe(false);
  });

  it('should return false when dates are equal', () => {
    const target = new Date('2024-03-15');
    const compareDate = new Date('2024-03-15');
    expect(isAfter(target, compareDate)).toBe(false);
  });

  it('should compare by specified unit (day)', () => {
    const target = new Date('2024-03-15 23:59:59');
    const compareDate = new Date('2024-03-15 00:00:00');
    expect(isAfter(target, compareDate, 'day')).toBe(false);
  });

  it('should compare by specified unit (hour)', () => {
    const target = new Date('2024-03-15 15:00:00');
    const compareDate = new Date('2024-03-15 14:59:59');
    expect(isAfter(target, compareDate, 'hour')).toBe(true);
  });

  it('should throw error for invalid target date', () => {
    const target = new Date('invalid');
    const compareDate = new Date();
    expect(() => isAfter(target, compareDate)).toThrow('Invalid target');
  });

  it('should throw error for invalid compare date', () => {
    const target = new Date();
    const compareDate = new Date('invalid');
    expect(() => isAfter(target, compareDate)).toThrow('Invalid compareDate');
  });
});

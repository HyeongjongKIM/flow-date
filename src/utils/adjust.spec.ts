import { adjust } from './adjust';

describe('adjust', () => {
  it('should throw error for invalid date', () => {
    expect(() => adjust(new Date('invalid'), 1)).toThrow('Invalid date');
  });

  it('should throw error for invalid amount', () => {
    expect(() => adjust(new Date(), NaN)).toThrow('Invalid amount');
  });

  it('should return new date instance when amount is 0', () => {
    const original = new Date('2024-03-15');
    const result = adjust(original, 0);
    expect(result).not.toBe(original);
    expect(result.getTime()).toBe(original.getTime());
  });

  describe('adjusting different units', () => {
    it('should adjust milliseconds', () => {
      const date = new Date('2024-03-15T12:30:45.500');
      const result = adjust(date, 100, 'millisecond');
      expect(result.getMilliseconds()).toBe(600);
    });

    it('should adjust seconds', () => {
      const date = new Date('2024-03-15T12:30:45');
      const result = adjust(date, 10, 'second');
      expect(result.getSeconds()).toBe(55);
    });

    it('should adjust minutes', () => {
      const date = new Date('2024-03-15T12:30:00');
      const result = adjust(date, 15, 'minute');
      expect(result.getMinutes()).toBe(45);
    });

    it('should adjust hours', () => {
      const date = new Date('2024-03-15T12:00:00');
      const result = adjust(date, 3, 'hour');
      expect(result.getHours()).toBe(15);
    });

    it('should adjust days', () => {
      const date = new Date('2024-03-15');
      const result = adjust(date, 5, 'day');
      expect(result.getDate()).toBe(20);
    });

    it('should adjust months', () => {
      const date = new Date('2024-03-15');
      const result = adjust(date, 2, 'month');
      expect(result.getMonth()).toBe(4);
    });

    it('should adjust years', () => {
      const date = new Date('2024-03-15');
      const result = adjust(date, 1, 'year');
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe('edge cases', () => {
    it('should handle month end dates correctly', () => {
      const date = new Date('2024-03-31');
      const result = adjust(date, 1, 'month');
      expect(result.getDate()).toBe(30);
    });

    it('should handle leap year correctly', () => {
      const date = new Date('2024-02-29');
      const result = adjust(date, 1, 'year');
      expect(result.getDate()).toBe(28);
    });

    it('should handle negative adjustments', () => {
      const date = new Date('2024-03-15');
      const result = adjust(date, -1, 'month');
      expect(result.getMonth()).toBe(1);
      expect(result.getFullYear()).toBe(2024);
    });
  });
});

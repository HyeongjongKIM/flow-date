import { diff } from './diff';

describe('diff', () => {
  const baseDate = new Date('2024-03-15T10:30:45.123');

  describe('millisecond difference', () => {
    it('should calculate millisecond difference correctly', () => {
      const laterDate = new Date('2024-03-15T10:30:45.223');
      const result = diff(laterDate, baseDate, 'millisecond');
      expect(result).toBe(100);
    });

    it('should handle negative millisecond difference', () => {
      const earlierDate = new Date('2024-03-15T10:30:45.023');
      const result = diff(earlierDate, baseDate, 'millisecond');
      expect(result).toBe(-100);
    });
  });

  describe('second difference', () => {
    it('should calculate second difference correctly', () => {
      const laterDate = new Date('2024-03-15T10:30:55.123');
      const result = diff(laterDate, baseDate, 'second');
      expect(result).toBe(10);
    });

    it('should handle negative second difference', () => {
      const earlierDate = new Date('2024-03-15T10:30:35.123');
      const result = diff(earlierDate, baseDate, 'second');
      expect(result).toBe(-10);
    });
  });

  describe('minute difference', () => {
    it('should calculate minute difference correctly', () => {
      const laterDate = new Date('2024-03-15T10:45:45.123');
      const result = diff(laterDate, baseDate, 'minute');
      expect(result).toBe(15);
    });

    it('should handle negative minute difference', () => {
      const earlierDate = new Date('2024-03-15T10:15:45.123');
      const result = diff(earlierDate, baseDate, 'minute');
      expect(result).toBe(-15);
    });
  });

  describe('hour difference', () => {
    it('should calculate hour difference correctly', () => {
      const laterDate = new Date('2024-03-15T13:30:45.123');
      const result = diff(laterDate, baseDate, 'hour');
      expect(result).toBe(3);
    });

    it('should handle negative hour difference', () => {
      const earlierDate = new Date('2024-03-15T07:30:45.123');
      const result = diff(earlierDate, baseDate, 'hour');
      expect(result).toBe(-3);
    });
  });

  describe('day difference', () => {
    it('should calculate day difference correctly', () => {
      const laterDate = new Date('2024-03-18T10:30:45.123');
      const result = diff(laterDate, baseDate, 'day');
      expect(result).toBe(3);
    });

    it('should handle negative day difference', () => {
      const earlierDate = new Date('2024-03-12T10:30:45.123');
      const result = diff(earlierDate, baseDate, 'day');
      expect(result).toBe(-3);
    });
  });

  describe('week difference', () => {
    it('should calculate week difference correctly', () => {
      const laterDate = new Date('2024-03-29T10:30:45.123');
      const result = diff(laterDate, baseDate, 'week');
      expect(result).toBe(2);
    });

    it('should handle negative week difference', () => {
      const earlierDate = new Date('2024-03-01T10:30:45.123');
      const result = diff(earlierDate, baseDate, 'week');
      expect(result).toBe(-2);
    });
  });

  describe('month difference', () => {
    it('should calculate month difference correctly', () => {
      const laterDate = new Date('2024-05-15T10:30:45.123');
      const result = diff(laterDate, baseDate, 'month');
      expect(result).toBe(2);
    });

    it('should handle negative month difference', () => {
      const earlierDate = new Date('2024-01-15T10:30:45.123');
      const result = diff(earlierDate, baseDate, 'month');
      expect(result).toBe(-2);
    });
  });

  describe('year difference', () => {
    it('should calculate year difference correctly', () => {
      const laterDate = new Date('2026-03-15T10:30:45.123');
      const result = diff(laterDate, baseDate, 'year');
      expect(result).toBe(2);
    });

    it('should handle negative year difference', () => {
      const earlierDate = new Date('2022-03-15T10:30:45.123');
      const result = diff(earlierDate, baseDate, 'year');
      expect(result).toBe(-2);
    });
  });

  describe('edge cases', () => {
    it('should handle same date correctly', () => {
      const sameDate = new Date('2024-03-15T10:30:45.123');
      const result = diff(sameDate, baseDate, 'millisecond');
      expect(result).toBe(0);
    });

    it('should handle date objects with different timezones', () => {
      // Create two dates with known UTC times
      const date1 = new Date(Date.UTC(2024, 2, 15, 10, 0, 0, 0));
      const date2 = new Date(Date.UTC(2024, 2, 15, 11, 0, 0, 0));

      // The difference should be exactly 1 hour (in milliseconds)
      const result = diff(date2, date1, 'hour');
      expect(result).toBe(1);

      // The difference in milliseconds should be exactly 3600000 (1 hour)
      const diffInMs = diff(date2, date1, 'millisecond');
      expect(diffInMs).toBe(3600000);
    });

    it('should handle invalid dates', () => {
      const invalidDate = new Date('invalid');
      expect(() => diff(invalidDate, baseDate, 'millisecond')).toThrow();
      expect(() => diff(baseDate, invalidDate, 'millisecond')).toThrow();
    });
  });
});

import { fd, FlowDate } from './flow-date';

describe('FlowDate', () => {
  describe('FlowDate static methods', () => {
    test('static parse should work like Date.parse', () => {
      expect(FlowDate.parse('2024-03-20')).toBe(Date.parse('2024-03-20'));
    });

    test('static UTC should work like Date.UTC', () => {
      expect(FlowDate.UTC(2024, 2, 20)).toBe(Date.UTC(2024, 2, 20));
    });

    test('static now should work like Date.now', () => {
      const now = Date.now();
      expect(FlowDate.now()).toBeCloseTo(now, -2);
    });

    test('static isValid should validate dates correctly', () => {
      expect(FlowDate.isValid(new Date())).toBe(true);
      expect(FlowDate.isValid(new Date('invalid'))).toBe(false);
    });

    test('static isSame should compare dates correctly', () => {
      const date1 = new Date('2024-03-20');
      const date2 = new Date('2024-03-20');
      const date3 = new Date('2024-03-21');

      expect(FlowDate.isSame(date1, date2)).toBe(true);
      expect(FlowDate.isSame(date1, date3)).toBe(false);
      expect(FlowDate.isSame(date1, date3, 'month')).toBe(true);
    });

    test('static isBefore should compare dates correctly', () => {
      const earlier = new Date('2024-03-20');
      const later = new Date('2024-03-21');

      expect(FlowDate.isBefore(earlier, later)).toBe(true);
      expect(FlowDate.isBefore(later, earlier)).toBe(false);
    });

    test('static isAfter should compare dates correctly', () => {
      const earlier = new Date('2024-03-20');
      const later = new Date('2024-03-21');

      expect(FlowDate.isAfter(later, earlier)).toBe(true);
      expect(FlowDate.isAfter(earlier, later)).toBe(false);
    });

    test('static isBetween should check date ranges correctly', () => {
      const start = new Date('2024-03-20');
      const middle = new Date('2024-03-21');
      const end = new Date('2024-03-22');

      expect(FlowDate.isBetween(middle, start, end)).toBe(true);
      expect(FlowDate.isBetween(start, start, end)).toBe(false);
    });

    test('static freeze should create frozen date object', () => {
      const date = new Date('2024-03-20');
      const frozen = FlowDate.freeze(date);

      expect(frozen.getFullYear()).toBe(2024);
      expect(frozen.getMonth()).toBe(2); // 0-based month
      expect(frozen.getDate()).toBe(20);
    });

    test('static getYearWeek should return correct week number', () => {
      const date = new Date(2023, 11, 31);
      expect(FlowDate.toYearWeek(date)).toMatchObject({
        weekYear: 2023,
        weekNumber: 53,
        weekday: 1,
      });
    });

    test('static getNumericFormat should return numeric representation', () => {
      const date = new Date('2024-03-20');
      expect(typeof FlowDate.toNumericFormat(date)).toBe('number');
    });

    test('should calculate interval between dates', () => {
      const interval = FlowDate.diff(
        new Date('2024-03-15'),
        new Date('2024-03-20'),
        'day',
      );
      expect(interval).toBe(-5);
    });
  });

  describe('fd function', () => {
    test('should create FlowDate instance', () => {
      const date = fd();
      expect(date).toBeInstanceOf(FlowDate);
    });

    test('should accept Date object', () => {
      const date1 = new Date('2024-03-20');
      const date2 = fd(date1);
      expect(date2.toJSDate()).toEqual(date1);
    });

    test('should throw error for invalid date', () => {
      expect(() => fd(new Date('invalid'))).toThrow('Invalid Date');
    });

    test('should accept FlowDate object', () => {
      const originalFd = fd('2024-03-20');
      const newFd = fd(originalFd);
      expect(newFd.toJSDate()).toEqual(originalFd.toJSDate());
    });

    describe('method chaining', () => {
      test('should support method chaining for setters', () => {
        const date = fd(new Date('2024-03-20'));

        date.setHours(10).setMinutes(30).setSeconds(45);

        expect(date.getHours()).toBe(10);
        expect(date.getMinutes()).toBe(30);
        expect(date.getSeconds()).toBe(45);
      });

      test('should support adjust method', () => {
        const date = fd(new Date('2024-03-20'));

        date.adjust(1, 'day');
        expect(date.getDate()).toBe(21);
      });
    });

    describe('conversion methods', () => {
      test('should convert to JS Date', () => {
        const date = fd(new Date('2024-03-20'));
        expect(date.toJSDate()).toBeInstanceOf(Date);
      });

      test('should convert to frozen date', () => {
        const date = fd(new Date('2024-03-20'));
        const frozen = date.toFrozenDate();
        expect(frozen.getFullYear()).toBe(2024);
      });

      test('should convert to year week format', () => {
        const date = fd(2023, 11, 31);
        expect(date.toYearWeek()).toMatchObject({
          weekYear: 2023,
          weekNumber: 53,
          weekday: 1,
        });
      });

      test('should convert to numeric format', () => {
        const date = fd(new Date('2024-03-20'));
        expect(typeof date.toNumericFormat()).toBe('number');
      });
    });

    describe('comparison methods', () => {
      test('should compare dates correctly', () => {
        const date = fd(new Date('2024-03-20'));
        const compareDate = new Date('2024-03-21');

        expect(date.isBefore(compareDate)).toBe(true);
        expect(date.isAfter(compareDate)).toBe(false);
        expect(date.isSame(new Date('2024-03-20'))).toBe(true);
      });
    });

    describe('extended getters', () => {
      test('should get adjusted day with default week start', () => {
        const date = fd('2024-03-20'); // Wednesday
        expect(date.getAdjustedDay()).toBe(3); // Wednesday is day 3 when week starts from Sunday (0)
      });

      test('should get adjusted day with custom week start', () => {
        const date = fd('2024-03-20'); // Wednesday
        expect(date.getAdjustedDay(1)).toBe(2); // Wednesday is day 2 when week starts from Monday (1)
      });

      test('should get adjusted day for start of week', () => {
        const date = fd('2024-03-17'); // Sunday
        expect(date.getAdjustedDay()).toBe(0); // Sunday is day 0 when week starts from Sunday
        expect(date.getAdjustedDay(1)).toBe(6); // Sunday is day 6 when week starts from Monday
      });
    });

    describe('constructor', () => {
      test('should create instance from FlowDate object', () => {
        const originalFd = new FlowDate('2024-03-20');
        const date = new FlowDate(originalFd);
        expect(date.toJSDate()).toEqual(originalFd.toJSDate());
      });

      test('should throw error when creating from invalid FlowDate', () => {
        const invalidDate = new Date('invalid');
        expect(() => new FlowDate(invalidDate)).toThrow('Invalid Date');
      });
    });

    describe('calculators', () => {
      test('should calculate interval from date', () => {
        const date = fd(new Date('2024-03-20'));
        const interval = date.diffFrom(new Date('2024-03-15'), 'day');
        expect(interval).toBe(5);
      });

      test('should calculate interval to date', () => {
        const date = fd(new Date('2024-03-20'));
        const interval = date.diffTo(new Date('2024-03-15'), 'day');
        expect(interval).toBe(-5);
      });
    });
  });
});

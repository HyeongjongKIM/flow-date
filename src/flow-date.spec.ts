import { fd, FlowDate } from './flow-date';

const DATE_STRING = '2025-05-24' as const;

describe('Native date methods', () => {
  describe('toPrimitive', () => {
    test('default', () => {
      const flowDate = fd(DATE_STRING);
      const nativeDate = new Date(DATE_STRING);
      expect(flowDate + '').toBe(nativeDate + '');
    });
    test('string', () => {
      const flowDate = fd(DATE_STRING);
      const nativeDate = new Date(DATE_STRING);
      expect(String(flowDate)).toBe(String(nativeDate));
    });
    test('number', () => {
      const flowDate = fd(DATE_STRING);
      const nativeDate = new Date(DATE_STRING);
      expect(Number(flowDate)).toBe(Number(nativeDate));
    });
  });
  describe('constructor', () => {
    test('milliseconds', () => {
      const flowDate = fd(1748079810464);
      const nativeDate = new Date(1748079810464);
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('year and month', () => {
      const flowDate = fd(2025, 1);
      const nativeDate = new Date(2025, 1);
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('year, month, and date', () => {
      const flowDate = fd(2025, 1, 24);
      const nativeDate = new Date(2025, 1, 24);
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('year, month, date, hours, minutes, seconds, and ms', () => {
      const flowDate = fd(2025, 1, 24, 12, 30, 45, 500);
      const nativeDate = new Date(2025, 1, 24, 12, 30, 45, 500);
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('date string', () => {
      const flowDate = fd('2025-05-24');
      const nativeDate = new Date('2025-05-24');
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('date string with time', () => {
      const flowDate = fd('2025-05-24T12:30:45.500');
      const nativeDate = new Date('2025-05-24T12:30:45.500');
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('date string with time and timezone', () => {
      const flowDate = fd('2025-05-24T12:30:45.500+09:00');
      const nativeDate = new Date('2025-05-24T12:30:45.500+09:00');
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
    test('date string with time and timezone', () => {
      const flowDate = fd('2025-05-24T12:30:45.500Z');
      const nativeDate = new Date('2025-05-24T12:30:45.500Z');
      expect(flowDate.toString()).toBe(nativeDate.toString());
    });
  });
  describe('all the other methods', () => {
    test('static methods', () => {
      expect(FlowDate.parse(DATE_STRING)).toBe(Date.parse(DATE_STRING));
      expect(FlowDate.UTC(2025, 4, 24)).toBe(Date.UTC(2025, 4, 24));
      expect(FlowDate.now()).toBe(Date.now());
    });
    describe('all getters', () => {
      const flowDate = fd(DATE_STRING);
      const nativeDate = new Date(DATE_STRING);
      test('valueOf', () => {
        expect(flowDate.valueOf()).toBe(nativeDate.valueOf());
      });
      test('getTime', () => {
        expect(flowDate.getTime()).toBe(nativeDate.getTime());
      });
      test('getFullYear', () => {
        expect(flowDate.getFullYear()).toBe(nativeDate.getFullYear());
      });
      test('getUTCFullYear', () => {
        expect(flowDate.getUTCFullYear()).toBe(nativeDate.getUTCFullYear());
      });
      test('getMonth', () => {
        expect(flowDate.getMonth()).toBe(nativeDate.getMonth());
      });
      test('getUTCMonth', () => {
        expect(flowDate.getUTCMonth()).toBe(nativeDate.getUTCMonth());
      });
      test('getDate', () => {
        expect(flowDate.getDate()).toBe(nativeDate.getDate());
      });
      test('getUTCDate', () => {
        expect(flowDate.getUTCDate()).toBe(nativeDate.getUTCDate());
      });
      test('getDay', () => {
        expect(flowDate.getDay()).toBe(nativeDate.getDay());
      });
      test('getUTCDay', () => {
        expect(flowDate.getUTCDay()).toBe(nativeDate.getUTCDay());
      });
      test('getHours', () => {
        expect(flowDate.getHours()).toBe(nativeDate.getHours());
      });
      test('getUTCHours', () => {
        expect(flowDate.getUTCHours()).toBe(nativeDate.getUTCHours());
      });
      test('getMinutes', () => {
        expect(flowDate.getMinutes()).toBe(nativeDate.getMinutes());
      });
      test('getUTCMinutes', () => {
        expect(flowDate.getUTCMinutes()).toBe(nativeDate.getUTCMinutes());
      });
      test('getSeconds', () => {
        expect(flowDate.getSeconds()).toBe(nativeDate.getSeconds());
      });
      test('getUTCSeconds', () => {
        expect(flowDate.getUTCSeconds()).toBe(nativeDate.getUTCSeconds());
      });
      test('getMilliseconds', () => {
        expect(flowDate.getMilliseconds()).toBe(nativeDate.getMilliseconds());
      });
      test('getUTCMilliseconds', () => {
        expect(flowDate.getUTCMilliseconds()).toBe(
          nativeDate.getUTCMilliseconds(),
        );
      });
      test('getTimezoneOffset', () => {
        expect(flowDate.getTimezoneOffset()).toBe(
          nativeDate.getTimezoneOffset(),
        );
      });

      test('toString', () => {
        expect(flowDate.toString()).toBe(nativeDate.toString());
      });
      test('toDateString', () => {
        expect(flowDate.toDateString()).toBe(nativeDate.toDateString());
      });
      test('toTimeString', () => {
        expect(flowDate.toTimeString()).toBe(nativeDate.toTimeString());
      });

      // describe('toLocaleString', () => {
      //   test('toLocaleString()', () => {
      //     expect(flowDate.toLocaleString()).toBe(nativeDate.toLocaleString());
      //   });
      //   test('toLocaleString("en-US")', () => {
      //     expect(flowDate.toLocaleString('en-US')).toBe(
      //       nativeDate.toLocaleString('en-US'),
      //     );
      //   });
      //   test('toLocaleString(["en-US"])', () => {
      //     expect(flowDate.toLocaleString(['en-US'])).toBe(
      //       nativeDate.toLocaleString(['en-US']),
      //     );
      //   });
      // });

      test('toLocaleDateString', () => {
        expect(flowDate.toLocaleDateString()).toBe(
          nativeDate.toLocaleDateString(),
        );
      });
      test('toLocaleTimeString', () => {
        expect(flowDate.toLocaleTimeString()).toBe(
          nativeDate.toLocaleTimeString(),
        );
      });
      test('toUTCString', () => {
        expect(flowDate.toUTCString()).toBe(nativeDate.toUTCString());
      });
      test('toISOString', () => {
        expect(flowDate.toISOString()).toBe(nativeDate.toISOString());
      });
      test('toJSON', () => {
        expect(flowDate.toJSON()).toBe(nativeDate.toJSON());
      });
    });
    describe('all setters', () => {
      test('setTime', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const TIME = 1684800000000;

        nativeDate.setTime(TIME);

        expect(flowDate.setTime(TIME).getTime()).toBe(nativeDate.getTime());
      });
      test('setMilliseconds', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const MS = 123;

        nativeDate.setMilliseconds(MS);

        expect(flowDate.setMilliseconds(MS).getMilliseconds()).toBe(
          nativeDate.getMilliseconds(),
        );
      });
      test('setUTCMilliseconds', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const MS = 123;

        nativeDate.setUTCMilliseconds(MS);

        expect(flowDate.setUTCMilliseconds(MS).getUTCMilliseconds()).toBe(
          nativeDate.getUTCMilliseconds(),
        );
      });
      test('setSeconds', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const SEC = 123;

        nativeDate.setSeconds(SEC);

        expect(flowDate.setSeconds(SEC).getSeconds()).toBe(
          nativeDate.getSeconds(),
        );
      });
      test('setUTCSeconds', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const SEC = 123;

        nativeDate.setUTCSeconds(SEC);

        expect(flowDate.setUTCSeconds(SEC).getUTCSeconds()).toBe(
          nativeDate.getUTCSeconds(),
        );
      });
      test('setMinutes', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const MIN = 123;

        nativeDate.setMinutes(MIN);

        expect(flowDate.setMinutes(MIN).getMinutes()).toBe(
          nativeDate.getMinutes(),
        );
      });
      test('setUTCMinutes', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const MIN = 123;

        nativeDate.setUTCMinutes(MIN);

        expect(flowDate.setUTCMinutes(MIN).getUTCMinutes()).toBe(
          nativeDate.getUTCMinutes(),
        );
      });
      test('setHours', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const HOUR = 123;

        nativeDate.setHours(HOUR);

        expect(flowDate.setHours(HOUR).getHours()).toBe(nativeDate.getHours());
      });
      test('setUTCHours', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const HOUR = 123;

        nativeDate.setUTCHours(HOUR);

        expect(flowDate.setUTCHours(HOUR).getUTCHours()).toBe(
          nativeDate.getUTCHours(),
        );
      });
      test('setDate', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const DATE = 123;

        nativeDate.setDate(DATE);

        expect(flowDate.setDate(DATE).getDate()).toBe(nativeDate.getDate());
      });
      test('setUTCDate', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const DATE = 123;

        nativeDate.setUTCDate(DATE);

        expect(flowDate.setUTCDate(DATE).getUTCDate()).toBe(
          nativeDate.getUTCDate(),
        );
      });
      test('setMonth', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const MONTH = 123;

        nativeDate.setMonth(MONTH);

        expect(flowDate.setMonth(MONTH).getMonth()).toBe(nativeDate.getMonth());
      });
      test('setUTCMonth', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const MONTH = 123;

        nativeDate.setUTCMonth(MONTH);

        expect(flowDate.setUTCMonth(MONTH).getUTCMonth()).toBe(
          nativeDate.getUTCMonth(),
        );
      });
      test('setFullYear', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const YEAR = 123;

        nativeDate.setFullYear(YEAR);

        expect(flowDate.setFullYear(YEAR).getFullYear()).toBe(
          nativeDate.getFullYear(),
        );
      });
      test('setUTCFullYear', () => {
        const flowDate = fd(DATE_STRING);
        const nativeDate = new Date(DATE_STRING);
        const YEAR = 123;

        nativeDate.setUTCFullYear(YEAR);

        expect(flowDate.setUTCFullYear(YEAR).getUTCFullYear()).toBe(
          nativeDate.getUTCFullYear(),
        );
      });
    });
  });
});

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

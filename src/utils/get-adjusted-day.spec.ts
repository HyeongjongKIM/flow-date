import { getAdjustedDay } from './get-adjusted-day';

describe('getAdjustedDay', () => {
  it('should return correct adjusted day when weekStart is default (0 - Sunday)', () => {
    const sunday = new Date('2024-03-17'); // Sunday
    const monday = new Date('2024-03-18'); // Monday
    const saturday = new Date('2024-03-23'); // Saturday

    expect(getAdjustedDay(sunday)).toBe(0);
    expect(getAdjustedDay(monday)).toBe(1);
    expect(getAdjustedDay(saturday)).toBe(6);
  });

  it('should return correct adjusted day when weekStart is Monday (1)', () => {
    const sunday = new Date('2024-03-17'); // Sunday
    const monday = new Date('2024-03-18'); // Monday
    const saturday = new Date('2024-03-23'); // Saturday

    expect(getAdjustedDay(sunday, 1)).toBe(6); // Sunday becomes day 6
    expect(getAdjustedDay(monday, 1)).toBe(0); // Monday becomes day 0
    expect(getAdjustedDay(saturday, 1)).toBe(5); // Saturday becomes day 5
  });

  it('should return correct adjusted day when weekStart is Saturday (6)', () => {
    const sunday = new Date('2024-03-17'); // Sunday
    const monday = new Date('2024-03-18'); // Monday
    const saturday = new Date('2024-03-23'); // Saturday

    expect(getAdjustedDay(sunday, 6)).toBe(1); // Sunday becomes day 1
    expect(getAdjustedDay(monday, 6)).toBe(2); // Monday becomes day 2
    expect(getAdjustedDay(saturday, 6)).toBe(0); // Saturday becomes day 0
  });

  it('should handle weekStart values greater than 6 correctly', () => {
    const sunday = new Date('2024-03-17'); // Sunday
    const monday = new Date('2024-03-18'); // Monday

    // weekStart of 8 should behave the same as weekStart of 1 (8 % 7 = 1)
    expect(getAdjustedDay(sunday, 8)).toBe(6);
    expect(getAdjustedDay(monday, 8)).toBe(0);

    // weekStart of 14 should behave the same as weekStart of 0 (14 % 7 = 0)
    expect(getAdjustedDay(sunday, 14)).toBe(0);
    expect(getAdjustedDay(monday, 14)).toBe(1);
  });

  it('should handle negative weekStart values correctly', () => {
    const sunday = new Date('2024-03-17'); // Sunday

    // weekStart of -1 should behave the same as weekStart of 6 (-1 % 7 = 6)
    expect(getAdjustedDay(sunday, -1)).toBe(1);

    // weekStart of -7 should behave the same as weekStart of 0 (-7 % 7 = 0)
    expect(getAdjustedDay(sunday, -7)).toBe(0);
  });
});

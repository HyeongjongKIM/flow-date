import { getDateFromYearWeek } from './get-date-from-year-week';

describe('getDateFromYearWeek', () => {
  test('basic week calculation with default parameters', () => {
    // First week of 2024
    const date = getDateFromYearWeek(2024, 1);
    expect(date).toEqual(new Date(Date.UTC(2024, 0, 7))); // Should be January 1st, 2024
  });

  test('specific day in week', () => {
    // Second day of first week
    const date = getDateFromYearWeek(2024, 1, { day: 1 });
    expect(date).toEqual(new Date(Date.UTC(2024, 0, 8))); // Should be January 2nd, 2024
  });

  test('different week start (Monday = 1)', () => {
    const date = getDateFromYearWeek(2024, 1, { weekStart: 1 });
    expect(date).toEqual(new Date(Date.UTC(2024, 0, 1)));
  });

  test('mode 1 calculation', () => {
    const date = getDateFromYearWeek(2024, 1, { mode: 1 });
    expect(date).toEqual(new Date(Date.UTC(2023, 11, 31)));
  });

  test('later week in year', () => {
    // Week 26 of 2024
    const date = getDateFromYearWeek(2024, 26);
    expect(date).toEqual(new Date(Date.UTC(2024, 5, 30))); // Should be June 25th, 2024
  });

  test('edge cases', () => {
    // Week 52 (last week) of 2024
    const date = getDateFromYearWeek(2024, 52);
    expect(date).toEqual(new Date(Date.UTC(2024, 11, 29))); // Should be December 24th, 2024

    // Week 1 of 2025
    const nextYearDate = getDateFromYearWeek(2025, 1);
    expect(nextYearDate).toEqual(new Date(Date.UTC(2025, 0, 5)));
  });

  test('out of range', () => {
    // Week 53 of 2024
    const date = getDateFromYearWeek(2024, 53);
    expect(date).toEqual(new Date(Date.UTC(2025, 0, 5))); // Should be January 1st, 2025

    const date2 = getDateFromYearWeek(2025, 0);
    expect(date2).toEqual(new Date(Date.UTC(2024, 11, 29))); // Should be December 24th, 2024

    const date3 = getDateFromYearWeek(2025, -1);
    expect(date3).toEqual(new Date(Date.UTC(2024, 11, 22))); // Should be December 22th, 2024
  });
});

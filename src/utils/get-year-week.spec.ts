import { getYearWeek } from './get-year-week';

describe('getYearWeek', () => {
  test('December 31, 2023 (Sunday) mode:0 should return correct week', () => {
    const date = new Date(2023, 11, 31);
    const result = getYearWeek(date, { mode: 0 });
    expect(result).toMatchObject({
      weekYear: 2023,
      weekNumber: 53,
      weekday: 1,
    });
  });
  // mode only
  test('December 31, 2023 (Sunday) mode:1 should return correct week', () => {
    const date = new Date(2023, 11, 31);
    const result = getYearWeek(date, { mode: 1 });
    expect(result).toMatchObject({
      weekYear: 2024,
      weekNumber: 1,
      weekday: 1,
    });
  });
  test('January 1, 2024 (Monday) mode:0 should return correct week', () => {
    const date = new Date(2024, 0, 1);
    const result = getYearWeek(date, { mode: 0 });
    expect(result).toMatchObject({
      weekYear: 2023,
      weekNumber: 53,
      weekday: 2,
    });
  });
  test('January 1, 2024 (Monday) mode:1 should return correct week', () => {
    const date = new Date(2024, 0, 1);
    const result = getYearWeek(date, { mode: 1 });
    expect(result).toMatchObject({
      weekYear: 2024,
      weekNumber: 1,
      weekday: 2,
    });
  });

  // weekStart only
  test('December 31, 2024 (Tuesday) weekStart:2 should return correct week', () => {
    const date = new Date(2024, 11, 31);
    const result = getYearWeek(date, { weekStart: 2 });
    expect(result).toMatchObject({
      weekYear: 2024,
      weekNumber: 53,
      weekday: 1,
    });
  });
  test('December 31, 2024 (Tuesday) weekStart:3 should return correct week', () => {
    const date = new Date(2024, 11, 31);
    const result = getYearWeek(date, { weekStart: 3 });
    expect(result).toMatchObject({
      weekYear: 2024,
      weekNumber: 52,
      weekday: 7,
    });
  });
  // weekStart and mode
  test('December 31, 2024 (Tuesday) mode:1 weekStart:2 should return correct week', () => {
    const date = new Date(2024, 11, 31);
    const result = getYearWeek(date, { mode: 1, weekStart: 2 });
    expect(result).toMatchObject({
      weekYear: 2025,
      weekNumber: 1,
      weekday: 1,
    });
  });
  test('January 1, 2024 (Monday) mode:0 weekStart:1 should return correct week', () => {
    const date = new Date(2024, 0, 1);
    const result = getYearWeek(date, { mode: 0, weekStart: 1 });
    expect(result).toMatchObject({
      weekYear: 2024,
      weekNumber: 1,
      weekday: 1,
    });
  });
  //format
  test('June 1, 2024 (Monday) format:YYYY-ww should return correct week', () => {
    const date = new Date(2024, 5, 1);
    const result = getYearWeek(date, { format: 'YYYY-ww' });
    expect(result).toBe('2024-21');
  });
  test('June 1, 2024 (Monday) format:YYYY-Www should return correct week', () => {
    const date = new Date(2024, 5, 1);
    const result = getYearWeek(date, { format: 'YYYY-Www' });
    expect(result).toBe('2024-W21');
  });
  test('June 1, 2024 (Monday) format:YYYY-Www-D should return correct week', () => {
    const date = new Date(2024, 5, 1);
    const result = getYearWeek(date, { format: 'YYYY-Www-D' });
    expect(result).toBe('2024-W21-7');
  });
});

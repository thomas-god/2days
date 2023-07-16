import { createDateRange, createMonthDates } from './dateRange';

describe('Creating a date range from two dates', () => {
  it('should return an empty array if the start date is after the end date', () => {
    const start = new Date(2021, 1, 1);
    const end = new Date(2020, 1, 1);

    const result = createDateRange(start, end);

    expect(result).toEqual([]);
  });

  it('should return an array of dates', () => {
    const start = new Date(2021, 1, 1);
    const end = new Date(2021, 1, 2);

    const result = createDateRange(start, end);

    expectTypeOf(result).toEqualTypeOf<Date[]>();
  });

  it('should return an array of dates from the start date to the end date', () => {
    const start = new Date(2021, 1, 1);
    const end = new Date(2021, 1, 2);

    const result = createDateRange(start, end);

    expect(result[0]).toEqual(start);
    expect(result.at(-1)).toEqual(end);
  });

  it('should return the correct number of dates', () => {
    const start = new Date(2021, 1, 1);
    const end = new Date(2021, 1, 12);

    const result = createDateRange(start, end);

    expect(result.length).toEqual(12);
  });

  it('should not care of the time part of the dates', () => {
    const start = new Date(2021, 1, 1, 12, 30);
    const end = new Date(2021, 1, 2, 12, 30);

    const result = createDateRange(start, end);

    expect(result[0]).toEqual(new Date(2021, 1, 1));
    expect(result.at(-1)).toEqual(new Date(2021, 1, 2));
  });
});

describe("Creating a range of dates for a calendar month, i.e. including date for the previous month if they' of the same week", () => {
  it('should return an array of dates', () => {
    const date = new Date(2021, 1, 1);

    const result = createMonthDates(date);

    expectTypeOf(result).toEqualTypeOf<Date[]>();
  });

  it('should return only dates for the month if the 1st is a monday (eg. may 2023)', () => {
    const date = new Date(2023, 4, 6);

    const result = createMonthDates(date);

    expect(result[0]).toEqual(new Date(2023, 4, 1));
    expect(result.at(-1)).toEqual(new Date(2023, 4, 31));
  });

  it('should return dates for the previous month if the 1st is a tuesday (eg. july 2023)', () => {
    const date = new Date(2023, 6, 7);

    const result = createMonthDates(date);

    expect(result[0]).toEqual(new Date(2023, 5, 26));
    expect(result.at(-1)).toEqual(new Date(2023, 6, 31));
  });
});

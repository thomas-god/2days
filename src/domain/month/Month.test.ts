import { type IProvideDaysInMonth, Month, MonthError } from "./Month";


const fakeDaysInMonthProvider: IProvideDaysInMonth = {
  daysInMonth(month) {
    return 31;
  },
};

it("should instantiate a month with all days set to false", () => {
  const month = new Month(2022, 0, fakeDaysInMonthProvider);

  expect(month.days).toEqual(Array(31).fill(false));
});

it("should toggle a specific day within the month", () => {
  const month = new Month(2022, 0, fakeDaysInMonthProvider);

  const toggleRes = month.toggleDay(17);

  if (toggleRes.isErr()) throw new Error("should not error");
  const expectedDays = Array(31).fill(false);
  expectedDays[17] = true;
  expect(month.days).toEqual(expectedDays);
});

it("should toggle a specific day within the month multiple times", () => {
  const month = new Month(2022, 0, fakeDaysInMonthProvider);

  const toggleRes1 = month.toggleDay(17);
  if (toggleRes1.isErr()) throw new Error("should not error");
  const expectedDays1 = Array(31).fill(false);
  expectedDays1[17] = true;
  expect(month.days).toEqual(expectedDays1);

  const toggleRes2 = month.toggleDay(17);
  if (toggleRes2.isErr()) throw new Error("should not error");
  const expectedDays2 = Array(31).fill(false);
  expect(month.days).toEqual(expectedDays2);
});

it("should not allow to toggle day outside of month range", () => {
  const month = new Month(2022, 0, fakeDaysInMonthProvider);

  const toggleRes = month.toggleDay(47);

  if (toggleRes.isOk()) throw new Error("should error");
  expect(toggleRes.error).toEqual(MonthError.DayOutsideOfMonth);
});

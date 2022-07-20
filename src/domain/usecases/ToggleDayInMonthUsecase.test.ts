import { ToggleDayInMonthUsecase } from "./ToggleDayInMonthUsecase";

it("should toggle a day", () => {
  const month = [false, false, false];
  const dayToToggle = 2;
  const usecase = new ToggleDayInMonthUsecase();

  const toggleRes = usecase.toggleDay({ month, dayToToggle });

  if (toggleRes.isErr()) throw new Error("should not error");

  expect(toggleRes.value).toEqual([false, false, true]);
});

it("should toggle a day at the start of the month", () => {
  const month = [true, false, false];
  const dayToToggle = 0;
  const usecase = new ToggleDayInMonthUsecase();

  const toggleRes = usecase.toggleDay({ month, dayToToggle });

  if (toggleRes.isErr()) throw new Error("should not error");

  expect(toggleRes.value).toEqual([false, false, false]);
});

it("should toggle a day at the end of the month", () => {
  const month = [false, false, false];
  const dayToToggle = 2;
  const usecase = new ToggleDayInMonthUsecase();

  const toggleRes = usecase.toggleDay({ month, dayToToggle });

  if (toggleRes.isErr()) throw new Error("should not error");

  expect(toggleRes.value).toEqual([false, false, true]);
});

it("should handle days outside month", () => {
  const month = [false, false, false];
  const dayToToggle = 3;
  const usecase = new ToggleDayInMonthUsecase();

  const toggleRes = usecase.toggleDay({ month, dayToToggle });

  if (toggleRes.isOk()) throw new Error("should error");

  expect(toggleRes.error).toEqual("Day (3) is outside of month's range (3)");
});

import { err, ok } from "neverthrow";

import { CreateNewMonthUsecase } from "./CreateNewMonthUsecase";

const daysInMonthProviderOk = {
  daysInMonth: (year: number, month: number) => ok(3),
};
const daysInMonthProviderNok = {
  daysInMonth: (year: number, month: number) => err("toto"),
};

it("should create a new month", () => {
  const usecase = new CreateNewMonthUsecase(daysInMonthProviderOk);

  const monthRes = usecase.createNewMonth(2022, 10);
  if (monthRes.isErr()) {
    throw new Error("should not error");
  }

  expect(monthRes.value).toEqual([false, false, false]);
});

it("should return err on provider error", () => {
  const usecase = new CreateNewMonthUsecase(daysInMonthProviderNok);

  const monthRes = usecase.createNewMonth(2022, 10);
  if (monthRes.isOk()) {
    throw new Error("should error");
  }

  expect(monthRes.error).toEqual("toto");
});

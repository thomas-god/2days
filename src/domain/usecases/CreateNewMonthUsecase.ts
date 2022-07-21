import { Result, ok, err } from "neverthrow";

export interface ICreateNewMonthUsecase {
  createNewMonth(year: number, month: number): Result<boolean[], string>;
}

export interface IProvideDaysInMonth {
  daysInMonth(year: number, month: number): Result<number, string>;
}

export class CreateNewMonthUsecase implements ICreateNewMonthUsecase {
  constructor(private readonly daysInMonthProvider: IProvideDaysInMonth) {}

  createNewMonth(year: number, month: number): Result<boolean[], string> {
    const nbDaysRes = this.daysInMonthProvider.daysInMonth(year, month)
    if (nbDaysRes.isErr()) {
        return err(nbDaysRes.error)
    }

    return ok(Array(nbDaysRes.value).fill(false));
  }
}

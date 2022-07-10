import { err, ok, Result } from "neverthrow";

export interface IProvideDaysInMonth {
  daysInMonth(month: number): number;
}

export enum MonthError {
  DayOutsideOfMonth = "Given day exceeds total days in month",
}

export class Month {
  private readonly _days: boolean[];

  public constructor(
    private readonly month: number,
    private readonly year: number,
    private readonly daysInMonthProvider: IProvideDaysInMonth
  ) {
    this._days = Array(this.daysInMonthProvider.daysInMonth(this.month)).fill(
      false
    );
  }

  get days(): boolean[] {
    return this._days;
  }

  public toggleDay(this, day: number): Result<null, MonthError> {
    if (day > this.daysInMonthProvider.daysInMonth(this.month)) {
      return err(MonthError.DayOutsideOfMonth);
    }
    this._days[day] = !this._days[day];
    return ok(null);
  }
}

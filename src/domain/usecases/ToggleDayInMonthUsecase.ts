import { err, ok, Result } from "neverthrow";

export interface IToggleMonthCommand {
  month: boolean[];
  dayToToggle: number;
}

export interface IToggleDayInMonthUsecase {
  toggleDay(command: IToggleMonthCommand): Result<boolean[], string>;
}

export class ToggleDayInMonthUsecase implements IToggleDayInMonthUsecase {
  toggleDay(command: IToggleMonthCommand): Result<boolean[], string> {
    const { month, dayToToggle } = command;
    if(dayToToggle >= month.length) {
      return err(`Day (${dayToToggle}) is outside of month's range (${month.length})`)
    }
    return ok([
      ...month.slice(0, dayToToggle),
      !month[dayToToggle],
      ...month.slice(dayToToggle + 1),
    ]);
  }
}

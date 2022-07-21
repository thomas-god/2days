import { err, ok, Result } from "neverthrow";
import type { IProvideDaysInMonth } from "src/domain/usecases/CreateNewMonthUsecase";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export class DaysInMonthProvider implements IProvideDaysInMonth {
  daysInMonth(year: number, month: number): Result<number, string> {
    try {
      const date = dayjs(`${year}-${String(month).padStart(2, "0")}-01`, "YYYY-MM-DD", true)
      if (date.isValid()) {
        return ok(date.daysInMonth())
      }
      return err("Date is invalid")
    } catch (error) {
      return err(error);
    }
  }
}

import { DaysInMonthProvider } from "./DaysInMonthProvider";

it("should return the number of days in month", () => {
    const provider = new DaysInMonthProvider();

    const daysRes = provider.daysInMonth(2022, 6)

    if(daysRes.isErr()) throw new Error("should not error")

    expect(daysRes.value).toEqual(30)
})

it("should err for date outside month's range", () => {
    const provider = new DaysInMonthProvider();

    const daysRes = provider.daysInMonth(2022, 15)
    if(daysRes.isOk()) throw new Error("should error")

    expect(daysRes.error).toEqual("Date is invalid")
})
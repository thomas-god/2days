import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/svelte";

import CalendarDay from "./CalendarDay.svelte";

test("shows day status prop", () => {
  const { getByText } = render(CalendarDay, { status: true });
  expect(getByText("X")).toBeInTheDocument();
});

test("shows nothing for false day status prop", () => {
  const { queryByText } = render(CalendarDay, { status: false });
  expect(queryByText("X")).not.toBeInTheDocument();
});

test("fire event on click", async () => {
  const { getByText, component } = render(CalendarDay, { status: true });
  const eventListener = jest.fn()
  component.$on("calendarDayToggled", (event) => {
    eventListener(event)
  })
  await fireEvent.click(getByText("X"));
  expect(eventListener).toHaveBeenCalledTimes(1)
});

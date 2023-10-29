import { beforeEach, describe, it } from "$std/testing/bdd.ts";
import { DOMParser } from "linkedom";
import { render } from "@testing-library/preact";
import { assertEquals } from "$std/testing/asserts.ts";

import { SeriesOfDays } from "./SeriesOfDays.tsx";
import { DayOfHabit } from "../model/DayOfHabit.ts";

describe("SeriesOfDays", () => {
  beforeEach(() => {
    window.document = new DOMParser().parseFromString(
      "<html></html>",
      "text/html",
      // deno-lint-ignore no-explicit-any
    ) as any;
  });

  it("Should render the initial states", () => {
    const days: DayOfHabit[] = [
      { date: "2023-10-19", state: "PENDING" },
      { date: "2023-10-20", state: "DONE" },
      { date: "2023-10-21", state: "NOT_DONE" },
      { date: "2023-10-22", state: "PENDING" },
      { date: "2023-10-23", state: "DONE" },
    ];
    const { container } = render(
      <SeriesOfDays days={days} updateDay={() => Promise.resolve()} />,
    );

    const buttons = container.querySelectorAll("button");
    const icons = Array.from(buttons).map((b) => b.textContent);
    assertEquals(icons, ["⏳", "✅", "❌", "⏳", "✅"]);
  });
});

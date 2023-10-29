import { beforeEach, describe, it } from "$std/testing/bdd.ts";
import { DOMParser } from "linkedom";
import { render } from "@testing-library/preact";
import { assertEquals } from "$std/testing/asserts.ts";

import { SeriesOfDays } from "./SeriesOfDays.tsx";
import { State } from "../model/State.ts";

describe("SeriesOfDays", () => {
  beforeEach(() => {
    window.document = new DOMParser().parseFromString(
      "<html></html>",
      "text/html",
      // deno-lint-ignore no-explicit-any
    ) as any;
  });

  it("Should render the initial states", () => {
    const initialStates: State[] = [
      "PENDING",
      "DONE",
      "NOT_DONE",
      "PENDING",
      "DONE",
    ];
    const { container } = render(<SeriesOfDays states={initialStates} />);

    const buttons = container.querySelectorAll("button");
    const icons = Array.from(buttons).map((b) => b.textContent);
    assertEquals(icons, ["⏳", "✅", "❌", "⏳", "✅"]);
  });
});

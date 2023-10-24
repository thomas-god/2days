import { DOMParser } from "linkedom";
import { fireEvent, render } from "@testing-library/preact";
import { beforeEach, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/testing/asserts.ts";

import { Day, State } from "./Day.tsx";
import { signal } from "@preact/signals";

describe("Day", () => {
  beforeEach(() => {
    window.document = new DOMParser().parseFromString(
      "<html></html>",
      "text/html",
      // deno-lint-ignore no-explicit-any
    ) as any;
  });

  const wrappedDay = (initialState: State = "PENDING") => {
    const state = signal(initialState);
    const { container } = render(<Day state={state} />);
    return container.querySelector("button")!;
  };

  it("Should start by rendering the initial state ", () => {
    const button = wrappedDay();
    const icon = button.textContent;
    assertEquals(icon, "⏳");
  });

  it("Should render the DONE state when clicked once from PENDING state", () => {
    const button = wrappedDay();

    fireEvent.click(button);

    const icon = button.textContent;
    assertEquals(icon, "✅");
  });

  it("Should render the NOT_DONE state when clicked twice from PENDING state", () => {
    const button = wrappedDay();

    fireEvent.click(button);
    fireEvent.click(button);

    const icon = button.textContent;
    assertEquals(icon, "❌");
  });

  it("Should render the DONE state when clicked three times from PENDING state", () => {
    const button = wrappedDay();

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    const icon = button.textContent;
    assertEquals(icon, "✅");
  });
});

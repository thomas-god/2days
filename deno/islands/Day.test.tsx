import { DOMParser } from "linkedom";
import { fireEvent, render } from "@testing-library/preact";
import { beforeEach, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/testing/asserts.ts";

import { Day } from "./Day.tsx";

describe("Day", () => {
  beforeEach(() => {
    window.document = new DOMParser().parseFromString(
      "<html></html>",
      "text/html",
      // deno-lint-ignore no-explicit-any
    ) as any;
  });

  it("Should render the PENDING state per default", () => {
    const { container } = render(<Day />);
    const button = container.querySelector("button")!;
    const icon = button.textContent;
    assertEquals(icon, "⏳");
  });

  it("Should render the DONE state when clicked once", () => {
    const { container } = render(<Day />);
    const button = container.querySelector("button")!;

    fireEvent.click(button);

    const icon = button.textContent;
    assertEquals(icon, "✅");
  });

  it("Should render the NOT_DONE state when clicked twice", () => {
    const { container } = render(<Day />);
    const button = container.querySelector("button")!;

    fireEvent.click(button);
    fireEvent.click(button);

    const icon = button.textContent;
    assertEquals(icon, "❌");
  });

  it("Should render the DONE state when clicked three times", () => {
    const { container } = render(<Day />);
    const button = container.querySelector("button")!;

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    const icon = button.textContent;
    assertEquals(icon, "✅");
  });
});

import { describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/testing/asserts.ts";
import { toggleState } from "./State.ts";

describe("Toggling state", () => {
  it("Should toggle PENDING to DONE", () => {
    assertEquals(toggleState("PENDING"), "DONE");
  });
  it("Should toggle DONE to NOT_DONE", () => {
    assertEquals(toggleState("DONE"), "NOT_DONE");
  });
  it("Should toggle NOT_DONE to DONE", () => {
    assertEquals(toggleState("NOT_DONE"), "DONE");
  });
});

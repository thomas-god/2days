import { Signal } from "@preact/signals";
import { tw } from "twind";
import { State, toggleState } from "../model/State.ts";

const icons: Record<State, string> = {
  DONE: "✅",
  NOT_DONE: "❌",
  PENDING: "⏳",
};

interface DayProps {
  state: Signal<State>;
  style?: string;
}

export function Day({ state, style = "" }: DayProps) {
  return (
    <button
      onClick={() => state.value = toggleState(state.value)}
      class={tw("text-3xl", "p-2", "focus:outline-none", style)}
    >
      {icons[state.value]}
    </button>
  );
}

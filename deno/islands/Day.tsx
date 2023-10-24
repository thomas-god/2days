import { Signal } from "@preact/signals";
import { tw } from "twind";

const states = ["DONE", "NOT_DONE", "PENDING"] as const;
export type State = typeof states[number];

const icons: Record<State, string> = {
  DONE: "✅",
  NOT_DONE: "❌",
  PENDING: "⏳",
};

const toggleState = (state: State): State => {
  switch (state) {
    case "DONE":
      return "NOT_DONE";
    case "NOT_DONE":
      return "DONE";
    case "PENDING":
      return "DONE";
  }
};

interface DayProps {
  state: Signal<State>;
  style?: string;
}

export function Day({ state, style = "" }: DayProps) {
  return (
    <button
      onClick={() => state.value = toggleState(state.value)}
      class={tw("text-3xl", "p-2", style)}
    >
      {icons[state.value]}
    </button>
  );
}

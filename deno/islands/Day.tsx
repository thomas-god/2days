import { useSignal } from "@preact/signals";

export interface DayProps {
  state: "DONE" | "NOT_DONE" | "PENDING";
}

const states = ["DONE", "NOT_DONE", "PENDING"] as const;
type State = typeof states[number];

const icons: Record<DayProps["state"], string> = {
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

export function Day() {
  const state = useSignal<State>("PENDING");

  return (
    <button
      onClick={() => state.value = toggleState(state.value)}
      class="text-3xl p-2"
    >
      {icons[state.value]}
    </button>
  );
}

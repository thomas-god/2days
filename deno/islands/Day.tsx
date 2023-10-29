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
  udpateState: (newState: State) => Promise<void>;
  style?: string;
}

export function Day({ state, udpateState, style = "" }: DayProps) {
  const update = async (state: Signal<State>) => {
    state.value = toggleState(state.value);
    await udpateState(state.value);
  };

  return (
    <button
      onClick={async () => await update(state)}
      class={tw("text-3xl", "p-2", "focus:outline-none", style)}
    >
      {icons[state.value]}
    </button>
  );
}

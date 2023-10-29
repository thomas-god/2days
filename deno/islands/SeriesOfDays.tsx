import { useSignal } from "@preact/signals";
import { Day } from "./Day.tsx";
import { State } from "../model/State.ts";

export function SeriesOfDays({ states }: { states: State[] }) {
  const dayStates = states.map((state) => useSignal<State>(state));
  return (
    <div class="flex justify-between gap-2">
      {dayStates.map((day, idx) => <Day state={day} key={idx} />)}
    </div>
  );
}

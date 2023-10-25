import { useSignal } from "@preact/signals";
import { Day, State } from "./Day.tsx";

export function SeriesOfDays({ states }: { states: State[] }) {
  const dayStates = states.map((state) => useSignal<State>(state));
  return (
    <div class="flex justify-between gap-2">
      {dayStates.map((day, idx) => <Day state={day} key={idx} />)}
    </div>
  );
}

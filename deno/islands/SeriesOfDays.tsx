import { useSignal } from "@preact/signals";
import { Day, State } from "./Day.tsx";

export function SeriesOfDays({ states }: { states: State[] }) {
  const dayStates = states.map((state) => useSignal<State>(state));
  return (
    <div class="mx-8 my-32 flex justify-between">
      {dayStates.map((day, idx) => <Day state={day} key={idx} />)}
    </div>
  );
}

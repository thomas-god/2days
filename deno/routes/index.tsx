import { useSignal } from "@preact/signals";
import { Day, State } from "../islands/Day.tsx";

export default function Home() {
  const days = Array(5).fill(0).map(() => useSignal<State>("PENDING"));
  return (
    <div class="mx-8 my-32">
      {days.map((day, idx) => <Day state={day} style="bg-red" key={idx} />)}
    </div>
  );
}

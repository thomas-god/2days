import { useSignal } from "@preact/signals";
import { Day } from "../islands/Day.tsx";

export default function Home() {
  return (
    <div class="m-8">
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </div>
  );
}

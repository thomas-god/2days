import { State } from "../islands/Day.tsx";
import { SeriesOfDays } from "../islands/SeriesOfDays.tsx";

export default function Home() {
  const days: State[] = Array(5).fill("PENDING");
  return (
    <section class="w-full flex justify-center">
      <SeriesOfDays states={days} />
    </section>
  );
}

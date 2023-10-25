import { State } from "../islands/Day.tsx";
import { HabitSummary } from "../components/HabitSummary.tsx";

export default function Home() {
  const habitName = "Drink water";
  const days: State[] = Array(5).fill("PENDING");
  return (
    <section class="w-full flex justify-center pt-4">
      <HabitSummary habit={habitName} lastDays={days} />
    </section>
  );
}

import { State } from "../islands/Day.tsx";
import { SeriesOfDays } from "../islands/SeriesOfDays.tsx";

export const HabitSummary = (
  { habit, lastDays }: { habit: string; lastDays: State[] },
) => {
  return (
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-xl">
        {habit}
      </h1>
      <SeriesOfDays states={lastDays} />
    </div>
  );
};

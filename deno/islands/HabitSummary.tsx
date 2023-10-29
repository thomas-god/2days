import { SeriesOfDays } from "./SeriesOfDays.tsx";
import { DayOfHabit } from "../model/DayOfHabit.ts";

interface HabitSummaryProps {
  habit: string;
  lastDays: DayOfHabit[];
}

const updateHabit = async (habit: string, day: DayOfHabit) => {
  const payload = {
    habit,
    day: day.date,
    state: day.state,
  };
  const res = await fetch("/api/habit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to update habit");
  }
};

export const HabitSummary = (
  { habit, lastDays }: HabitSummaryProps,
) => {
  const update = (day: DayOfHabit) => updateHabit(habit, day);
  return (
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-xl">
        {habit}
      </h1>
      <SeriesOfDays days={lastDays} updateDay={update} />
    </div>
  );
};

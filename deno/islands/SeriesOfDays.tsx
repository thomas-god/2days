import { useSignal } from "@preact/signals";
import { Day } from "./Day.tsx";
import { State } from "../model/State.ts";
import { DayOfHabit } from "../model/DayOfHabit.ts";

interface SeriesOfDaysProps {
  days: DayOfHabit[];
  updateDay: (day: DayOfHabit) => Promise<void>;
}

export function SeriesOfDays({ days, updateDay }: SeriesOfDaysProps) {
  const daysWithState = days.map((day) => (
    { day: day.date, state: useSignal<State>(day.state) }
  ));

  const updateFunction = (day: string) => {
    return (newState: State) => updateDay({ date: day, state: newState });
  };

  return (
    <div class="flex justify-between gap-2">
      {daysWithState.map((day, idx) => (
        <Day
          state={day.state}
          key={idx}
          udpateState={updateFunction(day.day)}
        />
      ))}
    </div>
  );
}

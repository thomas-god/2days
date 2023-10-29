import { HabitSummary } from "../islands/HabitSummary.tsx";
import { getSessionId } from "../plugins/kv_auth.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Greetings } from "../components/Greetings.tsx";
import { kv } from "../repository/kv.ts";
import { User } from "../repository/user.ts";
import { DayOfHabit } from "../model/DayOfHabit.ts";
import dayjs from "dayjs";
import { State } from "../model/State.ts";

interface HomeProps {
  name: string;
  habit: string;
  lastDays: DayOfHabit[];
}

const defaultStates: State[] = [
  "PENDING",
  "NOT_DONE",
  "NOT_DONE",
  "NOT_DONE",
  "NOT_DONE",
];

const buildDefaultStates = (): DayOfHabit[] => {
  const today = dayjs().startOf("day");
  return [0, 1, 2, 3, 4].map((i) => ({
    date: today.subtract(i, "day").format("YYYY-MM-DD"),
    state: defaultStates[i],
  }));
};

const fetchStates = async (
  userId: string,
  habit: string,
): Promise<DayOfHabit[]> => {
  const entries = kv.list<{ state: State }>({
    prefix: [
      "days_of_habit",
      userId,
      habit,
    ],
  });
  const states: DayOfHabit[] = [];
  for await (const entry of entries) {
    states.push({ date: String(entry.key.at(-1)), state: entry.value.state });
  }
  return states;
};

const getLastDays = async (
  userId: string,
  habit: string,
): Promise<DayOfHabit[]> => {
  const defaultDays = buildDefaultStates();
  const states = await fetchStates(userId, habit);
  return defaultDays.map((day) => {
    const existing = states.find((s) => s.date === day.date);
    if (existing) {
      return {
        ...day,
        state: existing.state,
      };
    }
    return day;
  }).sort((a, b) => a.date.localeCompare(b.date));
};

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const session = await getSessionId(req);
    if (!session) {
      return new Response("", {
        status: 307,
        headers: { Location: "/signin" },
      });
    }

    const user = await kv.get<User>(["users_by_sessionId", session]);
    if (!user || !user.value) {
      return new Response("", {
        status: 307,
        headers: { Location: "/signin" },
      });
    }

    const habitName = "Drink water";
    const lastDays = await getLastDays(user.value.id, habitName);
    return ctx.render({ name: user.value.name, habit: habitName, lastDays });
  },
};

const Home = (props: PageProps<HomeProps>) => {
  return (
    <>
      <section class="w-full flex flex-row-reverse pt-2 pr-2">
        <Greetings name={props.data.name} />
      </section>
      <section class="w-full flex justify-center pt-4">
        <HabitSummary habit={props.data.habit} lastDays={props.data.lastDays} />
      </section>
    </>
  );
};

export default Home;

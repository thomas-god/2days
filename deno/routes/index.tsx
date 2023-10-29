import { HabitSummary } from "../islands/HabitSummary.tsx";
import { getSessionId } from "../plugins/kv_auth.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Greetings } from "../components/Greetings.tsx";
import { kv } from "../repository/kv.ts";
import { User } from "../repository/user.ts";
import { DayOfHabit } from "../model/DayOfHabit.ts";
import dayjs from "dayjs";

interface HomeProps {
  name: string;
}

const getLastDays = (): DayOfHabit[] => {
  const today = dayjs().startOf("day");
  return [0, 1, 2, 3, 4].map((i) => ({
    date: today.subtract(i, "day").format("YYYY-MM-DD"),
    state: "PENDING",
  }));
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

    return ctx.render({ name: user.value.name });
  },
};

const Home = (props: PageProps<HomeProps>) => {
  const habitName = "Drink water";
  const lastDays = getLastDays();
  return (
    <>
      <section class="w-full flex flex-row-reverse pt-2 pr-2">
        <Greetings name={props.data.name} />
      </section>
      <section class="w-full flex justify-center pt-4">
        <HabitSummary habit={habitName} lastDays={lastDays} />
      </section>
    </>
  );
};

export default Home;

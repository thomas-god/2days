import { State } from "../islands/Day.tsx";
import { HabitSummary } from "../components/HabitSummary.tsx";
import { getSessionId } from "../plugins/kv_auth.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Greetings } from "../components/Greetings.tsx";
import { kv } from "../repository/kv.ts";
import { User } from "../repository/user.ts";

interface HomeProps {
  name: string;
}

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const session = await getSessionId(req);
    if (!session) {
      return Response.redirect("/signin");
    }

    const user = await kv.get<User>(["users_by_sessionId", session]);
    if (!user || !user.value) {
      return Response.redirect("/signin");
    }

    return ctx.render({ name: user.value.name });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  const habitName = "Drink water";
  const days: State[] = Array(5).fill("PENDING");
  return (
    <>
      <section class="w-full flex flex-row-reverse pt-2 pr-2">
        <Greetings name={props.data.name} />
      </section>
      <section class="w-full flex justify-center pt-4">
        <HabitSummary habit={habitName} lastDays={days} />
      </section>
    </>
  );
}

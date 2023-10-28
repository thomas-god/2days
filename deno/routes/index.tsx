import { State } from "../islands/Day.tsx";
import { HabitSummary } from "../components/HabitSummary.tsx";
import { getSessionId } from "../plugins/kv_auth.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const session = await getSessionId(req);
    if (!session) {
      return Response.redirect("/signin");
    }
    return ctx.render();
  },
};

export default function Home() {
  const habitName = "Drink water";
  const days: State[] = Array(5).fill("PENDING");
  return (
    <section class="w-full flex justify-center pt-4">
      <HabitSummary habit={habitName} lastDays={days} />
    </section>
  );
}

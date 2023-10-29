import { Handlers } from "$fresh/server.ts";
import { getSessionId } from "../../../plugins/kv_auth.ts";
import { kv } from "../../../repository/kv.ts";
import { User } from "../../../repository/user.ts";

import { z } from "zod";

const postSchema = z.object({
  habit: z.string(),
  day: z.string(),
  state: z.enum(["DONE", "NOT_DONE"]),
});
type PostSchema = z.infer<typeof postSchema>;

export const handler: Handlers<PostSchema> = {
  async POST(req) {
    console.log("POST /api/habit");
    const session = await getSessionId(req);
    if (!session) {
      console.log("No session");
      return new Response("", { status: 403 });
    }

    const user = await kv.get<User>(["users_by_sessionId", session]);
    if (!user || !user.value) {
      console.log("No user found");
      return new Response("", { status: 403 });
    }

    const rawBody = await req.json();
    const body = postSchema.safeParse(rawBody);

    if (!body.success) {
      console.log("Invalid body", body.error);
      return new Response(JSON.stringify(body.error), { status: 400 });
    }

    const { habit, day, state } = body.data;
    const key = ["days_of_habit", user.value.id, habit, day];
    const res = await kv.atomic().set(key, { state }).commit();

    if (!res.ok) {
      return new Response("", { status: 500 });
    }

    console.log(`Updated ${key.join("/")} to ${state}`);

    return new Response("", { status: 200 });
  },
};

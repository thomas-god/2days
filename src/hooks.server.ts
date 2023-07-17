import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import type { Handle } from '@sveltejs/kit';
import { pgDrizzleAdapter } from '$lib/db/auth';
import { db } from '$lib/db';

export const handle = SvelteKitAuth(async (event) => {
  const authOptions = {
    providers: [
      GitHub({
        clientId: event.platform.env.GITHUB_ID,
        clientSecret: event.platform.env.GITHUB_SECRET
      })
    ],
    secret: event.platform.env.AUTH_SECRET,
    trustHost: true,
    adapter: pgDrizzleAdapter(db)
  };
  return authOptions;
}) satisfies Handle;

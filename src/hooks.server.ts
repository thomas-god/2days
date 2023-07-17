import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import type { Handle } from '@sveltejs/kit';
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/static/private';
import { pgDrizzleAdapter } from '$lib/db/auth';
import { db } from '$lib/db';

export const handle = SvelteKitAuth(async () => {
  const authOptions = {
    providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
    secret: AUTH_SECRET,
    trustHost: true,
    adapter: pgDrizzleAdapter(db)
  };
  return authOptions;
}) satisfies Handle;

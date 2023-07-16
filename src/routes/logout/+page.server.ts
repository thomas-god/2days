import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  cookies.delete('username');
  cookies.delete('name', { httpOnly: false });
  cookies.set('loggedIn', 'false', { httpOnly: false });

  throw redirect(302, '/login');
}) satisfies PageServerLoad;

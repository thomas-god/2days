import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('username');
    cookies.delete('name', { httpOnly: false });
    cookies.set('loggedIn', 'false', { httpOnly: false });

    throw redirect(302, '/login');
  }
} satisfies Actions;

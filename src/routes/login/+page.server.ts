import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();

    const username = form.get('username') || '';

    cookies.set('username', username.toString());
    cookies.set('loggedIn', 'true', { httpOnly: false });
    cookies.set('name', username.toString(), { httpOnly: false });

    throw redirect(302, '/days');
  }
} satisfies Actions;

import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  return {
    loggedIn: cookies.get('loggedIn') === 'true',
    name: cookies.get('name')
  };
}) satisfies LayoutServerLoad;

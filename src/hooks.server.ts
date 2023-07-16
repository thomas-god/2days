import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname === '/login') {
    return await resolve(event);
  }

  if (!event.cookies.get('username')) {
    console.log('redirecting to login');
    throw redirect(302, '/login');
  }
  return await resolve(event);
}) satisfies Handle;

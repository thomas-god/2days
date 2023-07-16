import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createMonthDates } from '$lib/time';
import { fetchDays, insertDays } from '$lib/db/days';
import dayjs from 'dayjs';

interface Value {
  date: Date;
  state: boolean;
}

async function getValues(now: Date, user: string): Promise<Value[]> {
  const dates = createMonthDates(now);
  const rows = await fetchDays(user, 'default', dates[0], dates.at(-1) as Date);
  return dates.map((date) => {
    const row = rows.find((row) => dayjs(row.date).isSame(date, 'day'));
    return {
      date,
      state: row?.state ?? false
    };
  });
}

export const load = (async ({ cookies }) => {
  if (!cookies.get('username')) {
    throw redirect(302, '/login');
  }
  const now = new Date();
  const values = await getValues(now, cookies.get('username') as string);

  return {
    now,
    dates: values
  };
}) satisfies PageServerLoad;

export const actions = {
  toggle: async ({ request, cookies }) => {
    if (!cookies.get('username')) {
      throw redirect(302, '/login');
    }

    const user = cookies.get('username') as string;
    const form = await request.formData();
    const date = new Date(form.get('date') as string);
    const previousState = form.get('state') === 'true';
    await insertDays(user, 'default', date, !previousState);
  }
} satisfies Actions;

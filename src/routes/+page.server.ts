import type { PageServerLoad, Actions } from './$types';
import { createMonthDates } from './lib/time';

interface Value {
  date: Date;
  state: boolean;
}

const now = new Date();
const dates = createMonthDates(now);
const values = getValues(dates);

function getValues(dates: Date[]): Value[] {
  return dates.map((date) => {
    return {
      date,
      state: Math.random() < 0.5
    };
  });
}

const toggleValue = (date: Date) => {
  const value = values.find((value) => value.date.getTime() === date.getTime());
  if (value) {
    value.state = !value.state;
  }
};

export const load = (async () => {
  return {
    now,
    dates: values
  };
}) satisfies PageServerLoad;

export const actions = {
  toggle: async ({ request }) => {
    const form = await request.formData();
    const date = new Date(form.get('date') as string);
    toggleValue(date);
  }
} satisfies Actions;

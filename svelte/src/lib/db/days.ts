import { and, between, eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { toDate } from '$lib/time/format';
import { daysTable } from './days.schema';

export const fetchDays = async (user: string, panel: string, start: Date, end: Date) => {
  const result = await db
    .select({
      date: daysTable.date,
      state: daysTable.state
    })
    .from(daysTable)
    .where(
      and(
        eq(daysTable.user, user),
        eq(daysTable.panel, panel),
        between(daysTable.date, toDate(start), toDate(end))
      )
    );
  return result;
};

export const insertDays = async (user: string, panel: string, date: Date, state: boolean) => {
  const result = await db
    .insert(daysTable)
    .values({
      user,
      panel,
      date: toDate(date),
      state
    })
    .onConflictDoUpdate({
      target: [daysTable.user, daysTable.panel, daysTable.date],
      set: { state }
    });
  return result;
};

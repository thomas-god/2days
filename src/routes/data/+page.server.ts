import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, text, real } from 'drizzle-orm/pg-core';
import type { InferModel } from 'drizzle-orm';
import { DATABASE_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

const dummyTable = pgTable('playing_with_neon', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  value: real('value')
});

export type TableRow = InferModel<typeof dummyTable>;
export type NewTableRow = InferModel<typeof dummyTable, 'insert'>;

export const load = (async () => {
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);
  const result = await db.select().from(dummyTable);
  return { result };
}) satisfies PageServerLoad;

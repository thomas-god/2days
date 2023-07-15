import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, serial, text, real } from 'drizzle-orm/pg-core';
import type { InferModel } from 'drizzle-orm';
import { DATABASE_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

neonConfig.webSocketConstructor = ws;

const dummyTable = pgTable('playing_with_neon', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	value: real('value')
});

export type TableRow = InferModel<typeof dummyTable>;
export type NewTableRow = InferModel<typeof dummyTable, 'insert'>;

export const load = (async () => {
	const pool = new Pool({ connectionString: DATABASE_URL });
	const db = drizzle(pool);
	const result = await db.select().from(dummyTable);
	return { result };
}) satisfies PageServerLoad;

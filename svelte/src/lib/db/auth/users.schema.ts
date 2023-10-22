import { sql } from 'drizzle-orm';
import { timestamp, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id')
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image')
});

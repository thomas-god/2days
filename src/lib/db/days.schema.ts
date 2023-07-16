import type { InferModel } from 'drizzle-orm';
import { boolean, date, pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';

export const daysTable = pgTable(
  't_days',
  {
    id: serial('id').primaryKey(),
    user: text('user').notNull(),
    panel: text('panel').default('default'),
    date: date('date').notNull(),
    state: boolean('state').default(false).notNull()
  },
  (table) => {
    return {
      t_days_unique_key: uniqueIndex('t_days_uniqued_key').on(table.user, table.panel, table.date)
    };
  }
);

export type Days = InferModel<typeof daysTable>;
export type NewDays = InferModel<typeof daysTable, 'insert'>;


////TABLA :  :  order_statuses

import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const tableName = 'order_statuses';
export const route =  'order_statuses';
export const definition = {
  id: text('id').primaryKey(),
  status_name: text('status_name').notNull(),
  color: text('color').notNull(),
  privacy: text('privacy').notNull().default('private'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
  created_by: text('created_by'),
  updated_by: text('updated_by')
};

export const table = sqliteTable(tableName, {
  ...definition
});
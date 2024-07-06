
////TABLA :  :  shipping_zones

import { text,  sqliteTable } from 'drizzle-orm/sqlite-core';

export const tableName = 'shipping_zones';

export const definition = {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  display_name: text('display_name').notNull(),
  active: text('active'),
  free_shipping: text('free_shipping'),
  rate_type: text('rate_type'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
  created_by: text('created_by'),
  updated_by: text('updated_by')
};

export const table = sqliteTable(tableName, {
  ...definition
});
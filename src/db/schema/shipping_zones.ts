
////TABLA :  :  shipping_zones

import { text,  sqliteTable } from 'drizzle-orm/sqlite-core';
import { auditSchema } from './audit';
export const tableName = 'shipping_zones';
export const route =  'shipping_zones';
export const definition = {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  display_name: text('display_name').notNull(),
  active: text('active'),
  free_shipping: text('free_shipping'),
  rate_type: text('rate_type'),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema

});
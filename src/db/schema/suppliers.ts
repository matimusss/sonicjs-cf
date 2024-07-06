import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import * as countries from './countries';

export const tableName = 'suppliers';
export const route = 'suppliers';
export const definition = {
  id: text('id').primaryKey(),
  supplier_name: text('supplier_name').notNull(),
  company: text('company'),
  phone_number: text('phone_number'),
  address_line1: text('address_line1').notNull(),
  address_line2: text('address_line2'),
  country_id: integer('country_id').references(() => countries.table.id).notNull(),
  city: text('city'),
  note: text('note'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
  created_by: text('created_by'),
  updated_by: text('updated_by')
};

export const table = sqliteTable(tableName, {
  ...definition
});

export const relation = relations(table, ({ one }) => ({
  country: one(countries.table, {
    fields: [table.country_id],
    references: [countries.table.id]
  })
}));

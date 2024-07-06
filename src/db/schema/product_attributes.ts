
////TABLA :  :  product_attributes

import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import * as products from './products';
import * as attributes from './attributes';

export const tableName = 'product_attributes';
export const route = 'product_attributes';
export const definition = {
  id: text('id').primaryKey(),
  product_id: text('product_id').references(() => products.table.id).notNull(),
  attribute_id: text('attribute_id').references(() => attributes.table.id).notNull()
};

export const table = sqliteTable(tableName, {
  ...definition
});

export const relation = relations(table, ({ one }) => ({
  product: one(products.table, {
    fields: [table.product_id],
    references: [products.table.id]
  }),
  attribute: one(attributes.table, {
    fields: [table.attribute_id],
    references: [attributes.table.id]
  })
}));
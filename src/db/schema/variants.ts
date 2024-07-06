
////TABLA :  :  variants

import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import * as products from './products';
import * as variantOptions from './variant_options';

export const tableName = 'variants';
export const route =  'variants';
export const definition = {
  id: text('id').primaryKey(),
  variant_option: text('variant_option').notNull(),
  product_id: text('product_id').references(() => products.table.id).notNull(),
  variant_option_id: text('variant_option_id').references(() => variantOptions.table.id).notNull()
};

export const table = sqliteTable(tableName, {
  ...definition
});

export const relation = relations(table, ({ one }) => ({
  product: one(products.table, {
    fields: [table.product_id],
    references: [products.table.id]
  }),
  variantOption: one(variantOptions.table, {
    fields: [table.variant_option_id],
    references: [variantOptions.table.id]
  })
}));

////TABLA :  :  gallery

import { text,  sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import * as products from './products';

export const tableName = 'gallery';

export const definition = {
  id: text('id').primaryKey(),
  product_id: text('product_id').references(() => products.table.id),
  image: text('image').notNull(),
  placeholder: text('placeholder'),
  is_thumbnail:  text('is_thumbnail'),
  created_at:   text('created_at'),
  updated_at:   text('updated_at'),
};

export const table = sqliteTable(tableName, {
  ...definition
});

export const relation = relations(table, ({ one }) => ({
  product: one(products.table, {
    fields: [table.product_id],
    references: [products.table.id]
  })
}));
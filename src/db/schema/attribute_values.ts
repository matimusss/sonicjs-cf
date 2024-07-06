import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import * as attributes from './attributes';
import { auditSchema } from './audit';

export const tableName = 'attribute_values';
export const route = 'attribute_values';
export const definition = {
  id: text('id').primaryKey(),
  attribute_id: text('attribute_id').references(() => attributes.table.id).notNull(),
  attribute_value: text('attribute_value').notNull(),
  color: text('color')
};

export const table = sqliteTable(tableName, {
  ...definition
  ,
  ...auditSchema
});


export const relation = relations(table, ({ one }) => ({
  attribute: one(attributes.table, {
    fields: [table.attribute_id],
    references: [attributes.table.id]
  })
}));

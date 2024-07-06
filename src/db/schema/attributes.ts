import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const tableName = 'attributes';

export const definition = {
  id: text('id').primaryKey(),
  attribute_name: text('attribute_name').notNull()
};

export const table = sqliteTable(tableName, {
  ...definition
});
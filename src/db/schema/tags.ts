
////TABLA :  :  tags
import { ApiConfig } from '../routes';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const tableName = 'tags';
export const route =  'tags';
export const definition = {
  id: text('id').primaryKey(),
  tag_name: text('tag_name').notNull().unique()
};

export const table = sqliteTable(tableName, {
  ...definition
});

export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: true,
    update: true,
    delete: true
  }
};
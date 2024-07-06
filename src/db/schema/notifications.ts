import { text,  sqliteTable } from 'drizzle-orm/sqlite-core';
import { auditSchema } from './audit';
export const tableName = 'notifications';
export const route = 'notifications';



import { ApiConfig } from '../routes';


export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: true,
    update: true,
    delete: true
  }
};

export const definition = {
  id: text('id').primaryKey(),
  account_id: text('account_id'),
  title: text('title', 100),
  content: text('content'),
  seen: text('seen'),
  created_at: text('created_at').notNull(),
  receive_time: text('receive_time'),
  notification_expiry_date: text('notification_expiry_date')
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema
});

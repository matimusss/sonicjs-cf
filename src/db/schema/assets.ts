import {
  sqliteTable,
  text,
  integer
} from "drizzle-orm/sqlite-core";
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
export const tableName = 'assets';
export const route = 'assets';

// Definición de la estructura de la tabla
export const definition = {
  id: integer('id').primaryKey(),  // Se define como clave primaria e INTEGER
  name: text('name'), // Campo de texto para el nombre de la página
  html_code: text('html_code'), // Campo de texto para el código HTML de la página
  css_code: text('css_code')
};


export const table = sqliteTable('assets', {
  ...definition,
  ...auditSchema
});

export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: true,
    update: true,
    delete: true
  }
};
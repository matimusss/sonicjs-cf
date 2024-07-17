import { drizzle } from 'drizzle-orm/d1';
import { and, eq } from 'drizzle-orm';
import { tableSchemas } from '../../db/routes';
var qs = require('qs');










//EJEMPLO PAR ACONSULTAR vista.}




export async function getD1ByTableAndSlug_view(db, table, id) {
  // Define la consulta SQL con un parámetro de reemplazo
  let sql = `SELECT * FROM ${table} WHERE slug = ?`;
  try {
    // Prepara y ejecuta la consulta SQL con el parámetro proporcionado
    const { results } = await db.prepare(sql).bind(id).all();
    return results; // Devuelve los resultados de la consulta
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error; // Lanza el error para que pueda ser manejado en el llamador
  }
}

export async function getProduct(db, id) {
  try {
    // Consulta para obtener los detalles básicos del producto
    const productQuery = `
      SELECT
        id AS product_id,
        slug,
        product_name,
        sku,
        sale_price,
        compare_price,
        buying_price,
        quantity,
        short_description,
        product_description,
        product_type
      FROM products
      WHERE id = ?
    `;

    // Consulta para obtener las imágenes de la galería del producto
    const galleryQuery = `
      SELECT image
      FROM gallery
      WHERE product_id = ?
    `;

    // Consulta para obtener los valores de atributos del producto
    const attributeQuery = `
      SELECT av.attribute_value
      FROM product_attribute_values pav
      LEFT JOIN attribute_values av ON pav.attribute_value_id = av.id
      WHERE pav.product_attribute_id IN (
        SELECT id
        FROM product_attributes
        WHERE product_id = ?
      )
    `;

    // Consulta para obtener las etiquetas del producto
    const tagQuery = `
      SELECT tag_name
      FROM tags
      WHERE id IN (
        SELECT category_id
        FROM product_categories
        WHERE product_id = ?
      )
    `;

    // Consulta para obtener los proveedores del producto
    const supplierQuery = `
      SELECT supplier_name
      FROM suppliers
      WHERE id IN (
        SELECT supplier_id
        FROM product_suppliers
        WHERE product_id = ?
      )
    `;

    // Ejecutar las consultas de manera secuencial
    const [productDetails, galleryImages, attributeValues, tags, suppliers] = await Promise.all([
      db.prepare(productQuery).all(id),
      db.prepare(galleryQuery).all(id),
      db.prepare(attributeQuery).all(id),
      db.prepare(tagQuery).all(id),
      db.prepare(supplierQuery).all(id)
    ]);

    // Construir el objeto de respuesta combinando los resultados
    const product = {
      ...productDetails[0], // Tomar el primer resultado de productDetails
      gallery_images: galleryImages.map(img => img.image).join(', '),
      attribute_values: attributeValues.map(av => av.attribute_value).join(', '),
      tags: tags.map(tag => tag.tag_name).join(', '),
      suppliers: suppliers.map(supplier => supplier.supplier_name).join(', ')
    };

    // Imprimir el producto en la consola para verificar
    console.log('Producto obtenido:', product);

    return product;
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error; // Lanza el error para que pueda ser manejado en el llamador
  }
}







export async function getD1ProductsTableAndId_view(db, table, id) {
  // Define la consulta SQL con un parámetro de reemplazo
  let sql = `SELECT * FROM ${table} WHERE product_id = ?`;
  try {
    // Prepara y ejecuta la consulta SQL con el parámetro proporcionado
    const { results } = await db.prepare(sql).bind(id).all();
    return results; // Devuelve los resultados de la consulta
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error; // Lanza el error para que pueda ser manejado en el llamador
  }
}

export async function getD1byname_view(db, table) {
  // Define la consulta SQL con un parámetro de reemplazo
  let sql = `SELECT * FROM ${table}`;
  try {
    // Prepara y ejecuta la consulta SQL con el parámetro proporcionado
    const { results } = await db.prepare(sql).all();
    return results; // Devuelve los resultados de la consulta
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error; // Lanza el error para que pueda ser manejado en el llamador
  }
}







export async function getAllContent(db) {
  const { results } = await db.prepare('SELECT * FROM users').all();
  return results;
}

export async function getD1DataByTable(db, table, params) {
  const sql = generateSelectSql(table, params);
  const { results } = await db.prepare(sql).all();
  return params?.id ? results[0] : results;
}

export function generateSelectSql(table, params) {
  // console.log("params ==>", JSON.stringify(params, null, 2));

  var whereClause = '';
  var sortBySyntax = '';
  var limitSyntax: string = '';
  var offsetSyntax = '';

  if (params && params.id) {
    whereClause = `WHERE id = '${params.id}'`;
  } else if (params) {
    let { limit, offset, filters } = params;

    sortBySyntax = sortClauseBuilder(params);

    limit = limit ?? 0;
    limitSyntax = limit > 0 ? `limit ${limit}` : '';
    // console.log("limitSyntax ==>", limitSyntax);

    offset = offset ?? 0;
    offsetSyntax = offset > 0 ? `offset ${offset}` : '';

    whereClause = whereClauseBuilder(filters);
  }

  let sql = `SELECT *, COUNT() OVER() AS total FROM ${table} ${whereClause} ${sortBySyntax} ${limitSyntax} ${offsetSyntax}`;
  sql = sql.replace(/\s+/g, ' ').trim() + ';';

  console.log('sql ==>', sql);
  return sql;
}


export function prepareD1Data(data, tbl = '') {
  const table = data.table || tbl;
  const schema = getRepoFromTable(table);
  const now = new Date().getTime();
  data.createdOn = now;
  data.updatedOn = now;
  delete data.table;

  if (!schema.id) {
    delete data.id;
  }
  return data;
}

export async function insertD1Data(d1, kv, table, data) {
  const db = drizzle(d1);
  data = prepareD1Data(data, table);
  const schema = getRepoFromTable(table);
  try {
    // let sql = db.insert(schmea).values(data).getSQL();
    let result = await db.insert(schema).values(data).returning().get();
    return result;
  } catch (error) {
    return error;
  }
}

export async function deleteD1ByTableAndId(d1, table, id) {
  console.log('deleteD1ByTableAndId', table, id);
  const db = drizzle(d1);

  const schmea = getRepoFromTable(table);
  let sql = await db.delete(schmea).where(eq(schmea.id, id)).toSQL();

  let result = await db.delete(schmea).where(eq(schmea.id, id)).run();

  return result;
}

export async function updateD1Data(
  d1,
  table,
  data,
  params?: Record<string, any>
) {
  const db = drizzle(d1);
  const schemaTable = table ?? data.table;
  const repo = getRepoFromTable(schemaTable);
  const recordId = data.id;
  // delete data.table;
  if (data.data && data.data.id) {
    delete data.data.id;
  }

  const now = new Date().getTime();
  data.data.updatedOn = now;

  const eqArgs = [eq(repo.id, recordId)];
  if (params) {
    for (const key in params) {
      if (key !== 'id') {
        eqArgs.push(eq(repo[key], params[key]));
      }
    }
  }
  let result = await db
    .update(repo)
    .set(data.data)
    .where(and(...eqArgs))
    .returning({ id: repo.id })
    .values();

  // let result = await db
  // .update(repo)
  // .set(data)
  // .where(eq(repo.id, data.id))
  // // .returning({ updated: users.updatedAt })
  // .values();

  // .returning().get();

  const id = result && result[0] ? result[0]['0'] : undefined;

  // console.log("updating data result ", result);

  return { id } ?? result;
}

export function getSchemaFromTable(tableName) {
  return tableSchemas[tableName]?.definition;
}

export function getRepoFromTable(tableName) {
  return tableSchemas[tableName]?.table;
}

export function sortClauseBuilder(params) {
  let sortClause = '';

if(params.sort){
  sortClause = 'order by ' + params.sort.join(", ").replace(new RegExp(":", "g"),' ')
}

  return sortClause;
}

export function whereClauseBuilder(filters: any) {
  let whereClause = '';

  if (!filters || Object.keys(filters).length === 0) {
    return whereClause;
  }

  let AND = '';
  whereClause = 'WHERE';
  for (const key of Object.keys(filters)) {
    let filter = filters[key];
    let condition = Object.keys(filter)[0];
    // if (typeof filter === 'string') {
    //   if (filter.toLowerCase().includes('is')) {
    //     whereClause = `${whereClause} ${AND} ${key} ${filter}`;
    //   } else {
    //     whereClause = `${whereClause} ${AND} ${key} = '${filter}'`;
    //   }
    // } else {
    //   whereClause = `${whereClause} ${AND} ${key} = ${filter}`;
    // }
    whereClause = `${whereClause} ${AND} ${key} ${processCondition(
      condition
    )} '${filter[condition]}'`;

    AND = 'AND';
  }
  return whereClause;
}

export function processCondition(condition) {
  switch (condition) {
    case '$eq':
      return '=';
      break;

    default:
      break;
  }
}

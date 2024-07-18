import { drizzle } from 'drizzle-orm/d1';
import { and, eq, mapColumnsInAliasedSQLToAlias, param, ViewBaseConfig } from 'drizzle-orm';
import { tableSchemas } from '../../db/routes';
import { getOperationDeleteResult } from '../auth/auth-helpers';
import { convertUint8ArrayToHex, validateScryptHash } from 'lucia/dist/utils/crypto';
import { createFilterOptions, getButtonBaseUtilityClass, tableHeadClasses } from '@mui/material';
import { isFirstDayOfMonth, secondsInQuarter, weeksToDays } from 'date-fns';
import { serial, ViewBuilderCore } from 'drizzle-orm/mysql-core';
import { CognitoUserAuth } from '@lucia-auth/oauth/providers';
import { defaultConfigOptions } from 'swr/dist/_internal';
import { validateLuciaPasswordHash } from 'lucia/utils';
import { createLuciaUser } from '../util/testing';
import { yellow } from '@mui/material/colors';
import { loadNewContent } from '../admin/pages/content';
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
  // Consulta para obtener los detalles básicos del producto
  const productQuery = `
 SELECT
    p.id AS product_id,
    p.slug,
    p.product_name,
    p.sku,
    p.sale_price,
    p.compare_price,
    p.buying_price,
    p.quantity,
    p.short_description,
    p.product_description,
    p.product_type,
    GROUP_CONCAT(DISTINCT c.category_name) AS category_names,
    MAX(psi.weight) AS weight,
    MAX(psi.weight_unit) AS weight_unit,
    MAX(psi.volume) AS volume,
    MAX(psi.volume_unit) AS volume_unit,
    MAX(psi.dimension_width) AS dimension_width,
    MAX(psi.dimension_height) AS dimension_height,
    MAX(psi.dimension_depth) AS dimension_depth,
    MAX(psi.dimension_unit) AS dimension_unit,
    
    GROUP_CONCAT(DISTINCT g.image) AS gallery_images,
    GROUP_CONCAT(DISTINCT g.placeholder) AS gallery_placeholders,
    GROUP_CONCAT(DISTINCT g.is_thumbnail) AS is_thumbnails,
    
    GROUP_CONCAT(DISTINCT a.attribute_name) AS attribute_names,
    GROUP_CONCAT(DISTINCT av.attribute_value) AS attribute_values,
    GROUP_CONCAT(DISTINCT av.color) AS colors,
    
    GROUP_CONCAT(DISTINCT ps.supplier_id) AS supplier_ids,
    GROUP_CONCAT(DISTINCT s.supplier_name) AS supplier_names,
    
    GROUP_CONCAT(DISTINCT pc.coupon_id) AS coupon_ids,
    GROUP_CONCAT(DISTINCT co.code) AS coupon_codes,
    GROUP_CONCAT(DISTINCT co.discount_value) AS coupon_discount_values,
    GROUP_CONCAT(DISTINCT co.discount_type) AS coupon_discount_types,
    
    GROUP_CONCAT(DISTINCT pt.tag_id) AS tag_ids,
    GROUP_CONCAT(DISTINCT t.tag_name) AS tag_names,
    GROUP_CONCAT(DISTINCT t.icon) AS tag_icons
FROM products p
LEFT JOIN product_categories pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
LEFT JOIN product_shipping_info psi ON p.id = psi.product_id
LEFT JOIN gallery g ON p.id = g.product_id
LEFT JOIN product_attributes pa ON p.id = pa.product_id
LEFT JOIN product_attribute_values pav ON pa.id = pav.product_attribute_id
LEFT JOIN attribute_values av ON pav.attribute_value_id = av.id
LEFT JOIN attributes a ON pa.attribute_id = a.id
LEFT JOIN product_suppliers ps ON p.id = ps.product_id
LEFT JOIN suppliers s ON ps.supplier_id = s.id
LEFT JOIN product_coupons pco ON p.id = pco.product_id
LEFT JOIN coupons co ON pco.coupon_id = co.id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id
WHERE p.id = ?
GROUP BY p.id;
`;


  try {
    // Prepara y ejecuta la consulta SQL con el parámetro proporcionado
    const { results } = await db.prepare(productQuery).bind(id).all();
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

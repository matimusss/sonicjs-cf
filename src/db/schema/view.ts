import { eq, ne, gt, gte } from "drizzle-orm";

import * as products from './products';
import * as variant_options from './variant_options';
import * as variants from './variants';
import * as product_attributes from './product_attributes';
import * as product_coupons from './product_coupons';
import * as product_categories from './product_categories';
import * as gallery from './gallery';
import { ApiConfig } from '../routes';
import { integer, text, sqliteView, sqliteTable } from "drizzle-orm/sqlite-core";
export const route = 'view';
export const tablename  = 'product_full_details';
// Definición de la vista 'product_relations_view'
export const productRelationsView = sqliteView('product_full_details').as((qb) => {
  return qb
    .select({
      productId: products.table.id,
      productName: products.table.product_name,
      productSlug: products.table.slug,
      productSku: products.table.sku,
      productSalePrice: products.table.sale_price,
      productComparePrice: products.table.compare_price,
      productBuyingPrice: products.table.buying_price,
      productQuantity: products.table.quantity,
      productShortDescription: products.table.short_description,
      productDescription: products.table.product_description,
      productType: products.table.product_type,
      productPublished: products.table.published,
      productDisableOutOfStock: products.table.disable_out_of_stock,
      productNote: products.table.note,
      productCreatedBy: products.table.created_by,
      productUpdatedBy: products.table.updated_by,
      productCreatedOn: products.table.createdOn,
      productUpdatedOn: products.table.updatedOn,

      // Filas relacionadas de otras tablas
      galleryImage: gallery.table.image,
      categoryId: product_categories.table.category_id,
      couponId: product_coupons.table.coupon_id,
      attributeId: product_attributes.table.attribute_id,
      variantId: variants.table.id,
      variantOptionId: variant_options.table.id,
    })
    .from(products.table)
    .leftJoin(gallery.table, eq(products.table.id, gallery.table.product_id))
    .leftJoin(product_categories.table, eq(products.table.id, product_categories.table.product_id))
    .leftJoin(product_coupons.table, eq(products.table.id, product_coupons.table.product_id))
    .leftJoin(product_attributes.table, eq(products.table.id, product_attributes.table.product_id))
    .leftJoin(variants.table, eq(products.table.id, variants.table.product_id))
    .leftJoin(variant_options.table, eq(variants.table.id, variant_options.table.product_id))
    .where(eq(products.table.id, 'fb2b3959-18b2-4bc9-a21f-c27fd80202dd')); // Reemplaza 'fb2b3959-18b2-4bc9-a21f-c27fd80202dd' con el ID del producto específico que deseas consultar
});

export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: true,
    update: true,
    delete: true
  }
};

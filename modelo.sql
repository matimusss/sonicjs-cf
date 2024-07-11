CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES categories (id) ON DELETE SET NULL,
  category_name VARCHAR(255) NOT NULL UNIQUE,
  category_description TEXT,
  icon TEXT,
  image TEXT,
  placeholder TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_by UUID 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  product_name VARCHAR(255) NOT NULL,
  sku VARCHAR(255),
  sale_price NUMERIC NOT NULL DEFAULT 0,
  compare_price NUMERIC DEFAULT 0,
  buying_price NUMERIC DEFAULT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  short_description VARCHAR(165) NOT NULL,
  product_description TEXT NOT NULL,
  product_type VARCHAR(64) 
  published BOOLEAN DEFAULT FALSE,
  disable_out_of_stock BOOLEAN DEFAULT TRUE,
  note TEXT,
  created_by UUID 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) NOT NULL,
  category_id UUID REFERENCES categories(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_shipping_info (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  weight NUMERIC NOT NULL DEFAULT 0,
  weight_unit VARCHAR(10)
  volume NUMERIC NOT NULL DEFAULT 0,
  volume_unit VARCHAR(10) 
  dimension_width NUMERIC NOT NULL DEFAULT 0,
  dimension_height NUMERIC NOT NULL DEFAULT 0,
  dimension_depth NUMERIC NOT NULL DEFAULT 0,
  dimension_unit VARCHAR(10) 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  image TEXT NOT NULL,
  placeholder TEXT NOT NULL,
  is_thumbnail BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
) PARTITION BY HASH(id);

CREATE TABLE IF NOT EXISTS attributes (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  attribute_name VARCHAR(255) NOT NULL,
  created_by UUID 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS attribute_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  attribute_id UUID REFERENCES attributes(id) NOT NULL,
  attribute_value VARCHAR(255) NOT NULL,
  color VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) NOT NULL,
  attribute_id UUID REFERENCES attributes(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_attribute_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_attribute_id UUID REFERENCES product_attributes(id) NOT NULL,
  attribute_value_id UUID REFERENCES attribute_values(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS variant_options (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_id UUID REFERENCES gallery(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  sale_price NUMERIC NOT NULL DEFAULT 0,
  compare_price NUMERIC DEFAULT 0,
  buying_price NUMERIC DEFAULT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  sku VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (id)
);

-- Means a product has 2 variants black/XL red/XL
CREATE TABLE IF NOT EXISTS variants (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  variant_option TEXT NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  variant_option_id UUID REFERENCES variant_options(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS variant_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  variant_id UUID REFERENCES variants(id) NOT NULL,
  product_attribute_value_id UUID REFERENCES product_attribute_values(id) NOT NULL,
  PRIMARY KEY (id)
);





CREATE TABLE IF NOT EXISTS coupons (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_value NUMERIC,
  discount_type VARCHAR(50) NOT NULL,
  times_used NUMERIC NOT NULL DEFAULT 0,
  max_usage NUMERIC DEFAULT null,
  order_amount_limit NUMERIC DEFAULT null,
  coupon_start_date TIMESTAMPTZ,
  coupon_end_date TIMESTAMPTZ,
  created_by UUID 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_coupons (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) NOT NULL,
  coupon_id UUID REFERENCES coupons(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS countries (
  id INT NOT NULL DEFAULT NEXTVAL ('countries_seq'),
  iso CHAR(2) NOT NULL,
  name VARCHAR(80) NOT NULL,
  upper_name VARCHAR(80) NOT NULL,
  iso3 CHAR(3) DEFAULT NULL,
  num_code SMALLINT DEFAULT NULL,
  phone_code INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS shipping_zones (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT FALSE,
  free_shipping BOOLEAN DEFAULT FALSE,
  rate_type VARCHAR(64) 
  created_by UUID 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS shipping_country_zones (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  shipping_zone_id INTEGER REFERENCES shipping_zones(id) NOT NULL,
  country_id INTEGER REFERENCES countries(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS shipping_rates (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  shipping_zone_id INTEGER REFERENCES shipping_zones(id) NOT NULL,
  weight_unit VARCHAR(10)
  min_value NUMERIC NOT NULL DEFAULT 0,
  max_value NUMERIC DEFAULT NULL,
  no_max BOOLEAN DEFAULT TRUE,
  price NUMERIC NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS order_statuses (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  status_name VARCHAR(255) NOT NULL,
  color VARCHAR(50) NOT NULL,
  privacy VARCHAR(10)
  created_by UUID 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) NOT NULL,
  coupon_id UUID REFERENCES coupons(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id),
  order_status_id UUID REFERENCES order_statuses(id) ON DELETE SET NULL,
  order_approved_at TIMESTAMPTZ,
  order_delivered_carrier_date TIMESTAMPTZ,
  order_delivered_customer_date TIMESTAMPTZ,
  PRIMARY KEY (id) -- It's better to use Two-Phase Locking inside your transaction (SELECT ... FOR UPDATE) to prevent double booking problems for this table.
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  order_id VARCHAR(50) REFERENCES orders(id),
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (id) 
);

CREATE TABLE IF NOT EXISTS sells (
  id SERIAL NOT NULL,
  product_id UUID UNIQUE REFERENCES products(id),
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (id) 
);


CREATE TABLE IF NOT EXISTS notifications (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  account_id UUID 
  title VARCHAR(100),
  content TEXT,
  seen BOOLEAN,

 
  notification_expiry_date DATE,
  PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS tags (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  tag_name VARCHAR(255) NOT NULL,
  icon TEXT,

  created_by UUID 

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_tags (
  tag_id UUID REFERENCES tags(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  PRIMARY KEY (tag_id, product_id)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  supplier_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone_number VARCHAR(255),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  country_id INTEGER REFERENCES countries(id) NOT NULL,
  city VARCHAR(255),
  note TEXT,

  created_by UUID 

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_suppliers (
  product_id UUID REFERENCES products(id) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id) NOT NULL,
  PRIMARY KEY (product_id, supplier_id)
);



-- INDEXES --
-- Declaration of a foreign key constraint does not automatically create an index on the referencing columns.

-- products
CREATE INDEX idx_product_publish ON products (published);
-- customers
CREATE INDEX idx_customer_email ON customers (email);
-- product_categories
CREATE INDEX idx_product_category ON product_categories (product_id, category_id);
-- product_shipping_info
CREATE INDEX idx_product_shipping_info_product_id ON product_shipping_info (product_id);
-- gallery
CREATE INDEX idx_image_gallery ON gallery (product_id, is_thumbnail);
-- attribute_values
CREATE INDEX idx_attribute_values ON attribute_values (attribute_id);
-- product_attribute_values
CREATE INDEX idx_product_attribute_values_product_attribute_id ON product_attribute_values (product_attribute_id);
CREATE INDEX idx_product_attribute_values_attribute_value_id ON product_attribute_values (attribute_value_id);
-- product_attributes
CREATE INDEX idx_product_attribute_fk ON product_attributes (product_id, attribute_id);
-- variants
CREATE INDEX idx_product_id_variants ON variants (product_id);
CREATE INDEX idx_variant_option_id_variants ON variants (variant_option_id);
-- variant_values
CREATE INDEX idx_variant_id_variant_values ON variant_values (variant_id);
CREATE INDEX idx_product_attribute_value_id_variant_values ON variant_values (product_attribute_value_id);
-- coupons
CREATE INDEX idx_code_coupons ON coupons (code);
-- product_coupons
CREATE INDEX idx_product_id_coupon_id_product_coupons ON product_coupons (product_id, coupon_id);
-- shipping_country_zones
CREATE INDEX idx_shipping_zone_id_shipping_country_zones ON shipping_country_zones (shipping_zone_id);
CREATE INDEX idx_country_id_shipping_country_zones ON shipping_country_zones (country_id);
-- orders
CREATE INDEX idx_order_customer_id ON orders (customer_id);
-- order_items
CREATE INDEX idx_product_id_order_item ON order_items (product_id);
CREATE INDEX idx_order_id_order_item ON order_items (order_id);
-- cards
CREATE INDEX idx_customer_id_card ON cards (customer_id);
-- slideshows
CREATE INDEX idx_slideshows_publish ON slideshows (published);
-- product_suppliers
CREATE INDEX idx_product_supplier ON product_suppliers (product_id, supplier_id);
-- variant_options
CREATE INDEX idx_variant_options_product_id ON variant_options (product_id);





-- DEFAULT DATA --
WITH att_id AS ( INSERT INTO attributes (attribute_name) VALUES ('Color'), ('Size') RETURNING * )
INSERT INTO attribute_values (attribute_id, attribute_value, color) VALUES
  (( SELECT id FROM att_id WHERE attribute_name = 'Color'), 'black', '#000'),
  (( SELECT id FROM att_id WHERE attribute_name = 'Color'), 'white', '#FFF'),
  (( SELECT id FROM att_id WHERE attribute_name = 'Color'), 'red', '#FF0000'),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'), 'S', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'), 'M', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'L', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'2XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'3XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'4XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'), '5XL', null);
  
INSERT INTO order_statuses (status_name, color, privacy) VALUES
  ('Delivered', '#5ae510','public'),
  ('Unreached', '#ff03d3','public'),
  ('Paid', '#4caf50','public'),
  ('Confirmed', '#00d4cb','public'),
  ('Processing', '#ab5ae9', 'public'),
  ('Pending', '#ffe224', 'public'),
  ('On Hold', '#d6d6d6', 'public'),
  ('Shipped', '#71f9f7', 'public'),
  ('Cancelled', '#FD9F3D', 'public'),
  ('Refused', '#FF532F', 'private'),
  ('Awaiting Return', '#000', 'private'),
  ('Returned', '#000', 'private');
  
INSERT INTO roles (id, role_name, privileges) VALUES
  (1, 'Store Administrator', ARRAY ['super_admin_privilege', 'admin_read_privilege', 'admin_create_privilege', 'admin_update_privilege', 'admin_delete_privilege', 'staff_read_privilege', 'staff_create_privilege', 'staff_update_privilege', 'staff_delete_privilege']),
  (2, 'Sales Manager', ARRAY ['admin_read_privilege', 'admin_create_privilege', 'admin_update_privilege', 'admin_delete_privilege', 'staff_read_privilege', 'staff_create_privilege', 'staff_update_privilege', 'staff_delete_privilege']),
  (3, 'Sales Staff', ARRAY ['staff_read_privilege', 'staff_create_privilege', 'staff_update_privilege', 'staff_delete_privilege']),
  (4, 'Guest', ARRAY ['staff_read_privilege']),
  (5, 'Investor', ARRAY ['admin_read_privilege', 'staff_read_privilege']);

INSERT INTO tags (tag_name, icon) VALUES
  ( 'Tools', 'Tools'),
  ( 'Beauty Health', 'BeautyHealth'),
  ( 'Shirts', 'Shirts'),
  ( 'Accessories', 'Accessories');

CREATE TABLE `attributes` (
	`id` text PRIMARY KEY NOT NULL,
	`attribute_name` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `attribute_values` (
	`id` text PRIMARY KEY NOT NULL,
	`attribute_id` text NOT NULL,
	`attribute_value` text NOT NULL,
	`color` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`category_name` text,
	`category_description` text,
	`icon` text,
	`image` text,
	`placeholder` text,
	`active` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `categoriesToPosts` (
	`id` text NOT NULL,
	`postId` text NOT NULL,
	`categoryId` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	PRIMARY KEY(`categoryId`, `postId`),
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY NOT NULL,
	`iso` text NOT NULL,
	`name` text NOT NULL,
	`upper_name` text NOT NULL,
	`iso3` text,
	`num_code` integer,
	`phone_code` integer NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`discount_value` numeric,
	`discount_type` text NOT NULL,
	`times_used` numeric DEFAULT 0 NOT NULL,
	`max_usage` numeric,
	`order_amount_limit` numeric,
	`coupon_start_date` text,
	`coupon_end_date` text,
	`created_by` text,
	`updated_by` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text,
	`image` text NOT NULL,
	`placeholder` text,
	`is_thumbnail` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text,
	`title` text,
	`content` text,
	`seen` text,
	`created_at` text NOT NULL,
	`receive_time` text,
	`notification_expiry_date` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`coupon_id` text,
	`customer_id` text,
	`order_status_id` text,
	`order_approved_at` text,
	`order_delivered_carrier_date` text,
	`order_delivered_customer_date` text,
	`updated_by` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`order_status_id`) REFERENCES `order_statuses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text,
	`order_id` text,
	`price` numeric NOT NULL,
	`quantity` numeric NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order_statuses` (
	`id` text PRIMARY KEY NOT NULL,
	`status_name` text NOT NULL,
	`color` text NOT NULL,
	`privacy` text DEFAULT 'private' NOT NULL,
	`created_by` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`product_name` text NOT NULL,
	`sku` text,
	`sale_price` numeric DEFAULT 0 NOT NULL,
	`compare_price` numeric DEFAULT 0,
	`buying_price` numeric,
	`quantity` numeric DEFAULT 0 NOT NULL,
	`short_description` text NOT NULL,
	`product_description` text NOT NULL,
	`product_type` text,
	`published` numeric DEFAULT 0,
	`disable_out_of_stock` numeric DEFAULT 1,
	`note` text,
	`created_by` text,
	`updated_by` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `product_attributes` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`attribute_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_attribute_values` (
	`id` text PRIMARY KEY NOT NULL,
	`product_attribute_id` text NOT NULL,
	`attribute_value_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_attribute_id`) REFERENCES `product_attributes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`category_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_coupons` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`coupon_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_shipping_info` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text,
	`weight` numeric DEFAULT 0 NOT NULL,
	`weight_unit` text,
	`volume` numeric DEFAULT 0 NOT NULL,
	`volume_unit` text,
	`dimension_width` numeric DEFAULT 0 NOT NULL,
	`dimension_height` numeric DEFAULT 0 NOT NULL,
	`dimension_depth` numeric DEFAULT 0 NOT NULL,
	`dimension_unit` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_suppliers` (
	`product_id` text NOT NULL,
	`supplier_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_tags` (
	`product_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sells` (
	`id` numeric PRIMARY KEY NOT NULL,
	`product_id` text,
	`price` numeric NOT NULL,
	`quantity` numeric NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shipping_country_zones` (
	`id` text PRIMARY KEY NOT NULL,
	`shipping_zone_id` numeric NOT NULL,
	`country_id` numeric NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`shipping_zone_id`) REFERENCES `shipping_zones`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shipping_rates` (
	`id` text PRIMARY KEY NOT NULL,
	`shipping_zone_id` numeric NOT NULL,
	`weight_unit` text,
	`min_value` numeric NOT NULL,
	`max_value` numeric,
	`no_max` text,
	`price` numeric NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`shipping_zone_id`) REFERENCES `shipping_zones`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shipping_zones` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`display_name` text NOT NULL,
	`active` text,
	`free_shipping` text,
	`rate_type` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `slider_details` (
	`id` text PRIMARY KEY NOT NULL,
	`slideshow_id` text NOT NULL,
	`content` text NOT NULL,
	`display_order` numeric NOT NULL,
	FOREIGN KEY (`slideshow_id`) REFERENCES `slideshows`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `slideshows` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`destination_url` text,
	`image` text NOT NULL,
	`placeholder` text NOT NULL,
	`description` text,
	`btn_label` text,
	`display_order` numeric NOT NULL,
	`published` text,
	`clicks` numeric DEFAULT 0 NOT NULL,
	`styles` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` text PRIMARY KEY NOT NULL,
	`supplier_name` text NOT NULL,
	`company` text,
	`phone_number` text,
	`address_line1` text NOT NULL,
	`address_line2` text,
	`country_id` integer NOT NULL,
	`city` text,
	`note` text,
	`created_by` text,
	`updated_by` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`tag_name` text NOT NULL,
	`icon` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `variants` (
	`id` text PRIMARY KEY NOT NULL,
	`variant_option` text,
	`product_id` text NOT NULL,
	`variant_option_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variant_option_id`) REFERENCES `variant_options`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variant_options` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`image_id` text,
	`product_id` text NOT NULL,
	`sale_price` numeric NOT NULL,
	`compare_price` numeric,
	`buying_price` numeric,
	`quantity` numeric NOT NULL,
	`sku` text,
	`active` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`image_id`) REFERENCES `gallery`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variant_values` (
	`id` text PRIMARY KEY NOT NULL,
	`variant_id` text NOT NULL,
	`product_attribute_value_id` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`variant_id`) REFERENCES `variants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_attribute_value_id`) REFERENCES `product_attribute_values`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `sells_product_id_unique` ON `sells` (`product_id`);
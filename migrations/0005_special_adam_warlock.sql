CREATE TABLE `pages` (
	`ID` integer,
	`name` text,
	`slug` text PRIMARY KEY NOT NULL,
	`html_code` text,
	`css_code` text,
	`createdOn` integer,
	`updatedOn` integer
);

DROP INDEX IF EXISTS `tags_tag_name_unique`;--> statement-breakpoint
ALTER TABLE tags ADD `createdOn` integer;--> statement-breakpoint
ALTER TABLE tags ADD `updatedOn` integer;
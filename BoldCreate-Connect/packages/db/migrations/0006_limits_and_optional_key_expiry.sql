CREATE TABLE "limit_setting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"scope" text NOT NULL,
	"scope_id" uuid,
	"value" integer NOT NULL,
	"expires_at" timestamp with time zone,
	"reason" text NOT NULL,
	"updated_by" uuid,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "limit_setting_key_format" CHECK ("limit_setting"."key" ~ '^[a-z][a-z0-9_]{1,63}$'),
	CONSTRAINT "limit_setting_scope_check" CHECK ("limit_setting"."scope" IN ('global', 'organization', 'project')),
	CONSTRAINT "limit_setting_scope_id_check" CHECK (("limit_setting"."scope" = 'global') = ("limit_setting"."scope_id" IS NULL)),
	CONSTRAINT "limit_setting_value_positive" CHECK ("limit_setting"."value" > 0),
	CONSTRAINT "limit_setting_reason_length" CHECK (char_length("limit_setting"."reason") BETWEEN 1 AND 500)
);
--> statement-breakpoint
ALTER TABLE "limit_setting" ADD CONSTRAINT "limit_setting_updated_by_platform_admin_identity_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."platform_admin_identity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "limit_setting_global_unique" ON "limit_setting" USING btree ("key") WHERE "limit_setting"."scope" = 'global';--> statement-breakpoint
CREATE UNIQUE INDEX "limit_setting_scoped_unique" ON "limit_setting" USING btree ("key","scope","scope_id") WHERE "limit_setting"."scope_id" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "limit_setting_scope_idx" ON "limit_setting" USING btree ("scope","scope_id");--> statement-breakpoint
ALTER TABLE "project_key" ALTER COLUMN "expires_at" DROP NOT NULL;

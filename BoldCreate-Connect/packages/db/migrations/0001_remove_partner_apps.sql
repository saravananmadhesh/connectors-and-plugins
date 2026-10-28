-- The partner API is gone: its apps, members and keys, the org and user columns that pointed at an
-- app, and the console read policies that depended on them. Rows that only a partner app could own
-- (its service principal and its external users) are removed first; project users stay.
DROP POLICY IF EXISTS maintenance_partner_console_read_select ON "organization";--> statement-breakpoint
DROP POLICY IF EXISTS maintenance_partner_console_read_select ON "audit_log";--> statement-breakpoint
DELETE FROM "user" WHERE "kind" = 'service' OR ("kind" = 'external' AND "project_id" IS NULL);--> statement-breakpoint
ALTER TABLE "partner_app_key" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "partner_app_member" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "partner_app" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "partner_app_key" CASCADE;--> statement-breakpoint
DROP TABLE "partner_app_member" CASCADE;--> statement-breakpoint
DROP TABLE "partner_app" CASCADE;--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_partner_ref_unique";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_partner_ref_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_kind_check";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_kind_refs_check";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_partner_refs_check";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_external_ref_length";--> statement-breakpoint
ALTER TABLE "mcp_oauth_state" DROP CONSTRAINT "mcp_oauth_state_partner_fields_check";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_partner_app_id_partner_app_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT IF EXISTS "organization_partner_app_id_partner_app_id_fk";
--> statement-breakpoint
ALTER TABLE "mcp_oauth_state" DROP CONSTRAINT IF EXISTS "mcp_oauth_state_partner_app_id_partner_app_id_fk";
--> statement-breakpoint
DROP INDEX "user_one_service_per_app";--> statement-breakpoint
DROP INDEX "organization_partner_app_idx";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "partner_app_id";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "partner_app_id";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "external_ref";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "partner_access_enabled";--> statement-breakpoint
ALTER TABLE "mcp_oauth_state" DROP COLUMN "partner_app_id";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_kind_check" CHECK ("user"."kind" IN ('human', 'external'));--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_kind_refs_check" CHECK (("user"."kind" = 'human' AND "user"."project_id" IS NULL AND "user"."external_ref" IS NULL) OR ("user"."kind" = 'external' AND "user"."external_ref" IS NOT NULL AND "user"."project_id" IS NOT NULL));--> statement-breakpoint
ALTER TABLE "mcp_oauth_state" ADD CONSTRAINT "mcp_oauth_state_return_fields_check" CHECK ("mcp_oauth_state"."project_id" IS NOT NULL OR ("mcp_oauth_state"."return_url" IS NULL AND "mcp_oauth_state"."client_state" IS NULL));

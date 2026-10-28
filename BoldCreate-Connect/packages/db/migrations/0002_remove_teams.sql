-- Teams are gone: the team tables, the team columns on installations, keys and invites, and the team
-- scope. Installs at team scope are removed first (their components, variables and servers follow by
-- cascade); an invite that named a team stays as an invite for its organization role.
DELETE FROM "installation" WHERE "scope" = 'team';--> statement-breakpoint
ALTER TABLE "team_member" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "team" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "team_member" CASCADE;--> statement-breakpoint
DROP TABLE "team" CASCADE;--> statement-breakpoint
ALTER TABLE "email_token" DROP CONSTRAINT "email_token_invited_team_check";--> statement-breakpoint
ALTER TABLE "installation" DROP CONSTRAINT "installation_team_scope_shape";--> statement-breakpoint
ALTER TABLE "installation" DROP CONSTRAINT "installation_scope_check";--> statement-breakpoint
ALTER TABLE "installation" DROP CONSTRAINT "installation_user_scope_shape";--> statement-breakpoint
ALTER TABLE "installation" DROP CONSTRAINT "installation_org_scope_shape";--> statement-breakpoint
ALTER TABLE "installation" DROP CONSTRAINT "installation_project_scope_shape";--> statement-breakpoint
ALTER TABLE "api_key" DROP CONSTRAINT "api_key_user_scope_shape";--> statement-breakpoint
ALTER TABLE "api_key" DROP CONSTRAINT "api_key_org_scope_shape";--> statement-breakpoint
ALTER TABLE "email_token" DROP CONSTRAINT IF EXISTS "email_token_invited_team_id_team_id_fk";
--> statement-breakpoint
ALTER TABLE "installation" DROP CONSTRAINT IF EXISTS "installation_team_id_team_id_fk";
--> statement-breakpoint
ALTER TABLE "api_key" DROP CONSTRAINT IF EXISTS "api_key_team_id_team_id_fk";
--> statement-breakpoint
DROP INDEX "installation_team_scope_unique";--> statement-breakpoint
DROP INDEX "installation_team_idx";--> statement-breakpoint
ALTER TABLE "email_token" DROP COLUMN "invited_team_id";--> statement-breakpoint
ALTER TABLE "email_token" DROP COLUMN "invited_team_role";--> statement-breakpoint
ALTER TABLE "installation" DROP COLUMN "team_id";--> statement-breakpoint
ALTER TABLE "api_key" DROP COLUMN "team_id";--> statement-breakpoint
ALTER TABLE "installation" ADD CONSTRAINT "installation_scope_check" CHECK ("installation"."scope" IN ('org', 'user', 'project'));--> statement-breakpoint
ALTER TABLE "installation" ADD CONSTRAINT "installation_user_scope_shape" CHECK ("installation"."scope" != 'user' OR "installation"."user_id" IS NOT NULL);--> statement-breakpoint
ALTER TABLE "installation" ADD CONSTRAINT "installation_org_scope_shape" CHECK ("installation"."scope" != 'org' OR ("installation"."user_id" IS NULL AND "installation"."project_id" IS NULL));--> statement-breakpoint
ALTER TABLE "installation" ADD CONSTRAINT "installation_project_scope_shape" CHECK ("installation"."scope" != 'project' OR ("installation"."project_id" IS NOT NULL AND "installation"."user_id" IS NULL));--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_user_scope_shape" CHECK ("api_key"."scope" != 'user' OR ("api_key"."user_id" IS NOT NULL AND "api_key"."project_id" IS NOT NULL));--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_org_scope_shape" CHECK ("api_key"."scope" != 'org' OR ("api_key"."user_id" IS NULL AND "api_key"."project_id" IS NULL));
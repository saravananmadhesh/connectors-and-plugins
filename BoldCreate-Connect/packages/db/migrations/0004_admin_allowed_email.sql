CREATE TABLE "admin_allowed_email" (
	"email" text PRIMARY KEY NOT NULL,
	"source" text DEFAULT 'added' NOT NULL,
	"added_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_allowed_email_source_check" CHECK ("admin_allowed_email"."source" IN ('config', 'added'))
);

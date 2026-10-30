CREATE TABLE "error_event" (
	"id" uuid PRIMARY KEY NOT NULL,
	"group_id" uuid NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"environment" text NOT NULL,
	"app_version" text,
	"instance_id" text,
	"request_id" text,
	"trace_id" text,
	"org_id" uuid,
	"stack" text,
	"context" jsonb
);
--> statement-breakpoint
CREATE TABLE "error_group" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fingerprint" text NOT NULL,
	"service" text NOT NULL,
	"area" text,
	"title" text NOT NULL,
	"status" text DEFAULT 'unresolved' NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"first_seen" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen" timestamp with time zone DEFAULT now() NOT NULL,
	"app_version" text,
	"resolved_at" timestamp with time zone,
	"resolved_by" text,
	CONSTRAINT "error_group_fingerprint_unique" UNIQUE("fingerprint"),
	CONSTRAINT "error_group_status_check" CHECK ("error_group"."status" IN ('unresolved', 'resolved', 'ignored'))
);
--> statement-breakpoint
CREATE TABLE "ops_event" (
	"id" uuid PRIMARY KEY NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"service" text NOT NULL,
	"kind" text NOT NULL,
	"severity" text NOT NULL,
	"environment" text,
	"app_version" text,
	"instance_id" text,
	"org_id" uuid,
	"detail" jsonb,
	CONSTRAINT "ops_event_severity_check" CHECK ("ops_event"."severity" IN ('info', 'warning', 'error'))
);
--> statement-breakpoint
ALTER TABLE "error_event" ADD CONSTRAINT "error_event_group_id_error_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."error_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "error_event_occurred_at_idx" ON "error_event" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "error_event_group_occurred_at_idx" ON "error_event" USING btree ("group_id","occurred_at");--> statement-breakpoint
CREATE INDEX "error_group_status_last_seen_idx" ON "error_group" USING btree ("status","last_seen");--> statement-breakpoint
CREATE INDEX "error_group_service_last_seen_idx" ON "error_group" USING btree ("service","last_seen");--> statement-breakpoint
CREATE INDEX "error_group_last_seen_idx" ON "error_group" USING btree ("last_seen","id");--> statement-breakpoint
CREATE INDEX "ops_event_occurred_at_idx" ON "ops_event" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "ops_event_kind_occurred_at_idx" ON "ops_event" USING btree ("kind","occurred_at");--> statement-breakpoint
CREATE INDEX "ops_event_service_occurred_at_idx" ON "ops_event" USING btree ("service","occurred_at");--> statement-breakpoint
CREATE INDEX "ops_event_severity_occurred_at_idx" ON "ops_event" USING btree ("severity","occurred_at");
CREATE TABLE "user_component_preference" (
	"installation_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"component_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"enabled" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_component_preference_pk" PRIMARY KEY("installation_id","component_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "user_component_preference" ADD CONSTRAINT "user_component_preference_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_component_preference" ADD CONSTRAINT "user_component_preference_component_fk" FOREIGN KEY ("installation_id","component_id") REFERENCES "public"."installation_component"("installation_id","component_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_component_preference" ADD CONSTRAINT "user_component_preference_installation_organization_fk" FOREIGN KEY ("installation_id","organization_id") REFERENCES "public"."installation"("id","organization_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_component_preference" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_component_preference" FORCE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY user_component_preference_tenant ON "user_component_preference" USING (organization_id = nullif(current_setting('app.tenant', true), '')::uuid) WITH CHECK (organization_id = nullif(current_setting('app.tenant', true), '')::uuid);

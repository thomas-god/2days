CREATE TABLE IF NOT EXISTS "t_days" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"panel" text DEFAULT 'default',
	"date" date NOT NULL,
	"state" boolean DEFAULT false NOT NULL
);

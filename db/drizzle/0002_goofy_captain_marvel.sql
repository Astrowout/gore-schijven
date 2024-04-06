DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('To be reviewed', 'Approved', 'Rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contributions" (
	"spotify_id" varchar(62) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"review_sent" boolean DEFAULT false,
	"status" "status" DEFAULT 'To be reviewed',
	"feedback" text,
	"likes" integer DEFAULT 0,
	"dislikes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);

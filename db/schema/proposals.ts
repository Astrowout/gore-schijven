import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
    "To be reviewed",
    "Approved",
    "Rejected",
]);

export const proposals = pgTable("contributions", {
    spotifyId: varchar("spotify_id", { length: 62 }).primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    reviewSent: boolean("review_sent").default(false),
    status: statusEnum("status").default("To be reviewed"),
    feedback: text("feedback"),
    likes: integer("likes").default(0),
    dislikes: integer("dislikes").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export type TProposalDto = typeof proposals.$inferSelect; // return type when queried

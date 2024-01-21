import {
    boolean,
    int,
    mysqlEnum,
    mysqlTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";

export const proposals = mysqlTable("contributions", {
    spotifyId: varchar("spotify_id", { length: 62 }).primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    reviewSent: boolean("review_sent").default(false),
    status: mysqlEnum("status", [
        "To be reviewed",
        "Approved",
        "Rejected",
    ]).default("To be reviewed"),
    feedback: text("feedback"),
    likes: int("likes").default(0),
    dislikes: int("dislikes").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export type TProposalDto = typeof proposals.$inferSelect; // return type when queried
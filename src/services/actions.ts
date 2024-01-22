"use server";

import {
    and,
    eq,
} from "drizzle-orm";
import { MySqlInsert } from "drizzle-orm/mysql-core";

import { Status } from "@/types";
import { proposals } from "~/db/schema";

import db from "./db";
import { sendEmail } from "./email";
import { generateFeedback } from "./openai";
import { getProposal } from "./proposals";

export async function createProposal (trackId: string, email: string): Promise<MySqlInsert> {
    try {
        return db
            .insert(proposals)
            .values({
                spotifyId: trackId,
                email,
            });
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
};

export async function updateProposalStatus (id: string, status: Status): Promise<MySqlInsert> {
    try {
        const data = await db
            .update(proposals)
            .set({
                status,
            })
            .where(
                and(
                    eq(proposals.spotifyId, id),
                    eq(proposals.reviewSent, false),
                )
            );

        if (data) {
            const feedback = await generateFeedback(status);
            await db
                .update(proposals)
                .set({
                    status,
                    feedback,
                    reviewSent: true,
                })
                .where(
                    eq(proposals.spotifyId, id),
                );

            const data = await getProposal(id);

            await sendEmail(status, {
                songTitle: data.title,
                songArtist: data.artist,
                feedback: data.feedback,
                user_email: data.email,
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
};

export async function saveReactions (id: string, likes: number, dislikes: number) {
    try {
        const oldCount = await db.query.proposals
            .findFirst({
                columns: {
                    likes: true,
                    dislikes: true,
                },
                where: eq(proposals.spotifyId, id),
            });
        const oldLikesCount = oldCount?.likes || 0;
        const oldDislikesCount = oldCount?.dislikes || 0;

        return db
            .update(proposals)
            .set({
                likes: likes > oldLikesCount ? likes : oldLikesCount,
                dislikes: dislikes > oldDislikesCount ? dislikes : oldDislikesCount,
            })
            .where(
                eq(proposals.spotifyId, id)
            );
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
};
"use server";

import {
    and,
    eq,
} from "drizzle-orm";

import {
    Status,
    TProposal,
} from "@/types";
import { proposals } from "~/db/schema";

import db from "./db";
import { sendEmail } from "./email";
import { generateFeedback } from "./openai";
import { getProposal } from "./proposals";

export async function createProposal (trackId: string, email: string): Promise<string> {
    try {
        const result = await db
            .insert(proposals)
            .values({
                spotifyId: trackId,
                email,
            })
            .returning({ id: proposals.spotifyId });

        return result[0].id;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("An unknown error occured while creating your proposal. Please try again later.");
    }
};

export async function updateProposalStatus (id: string, status: Status): Promise<TProposal | undefined> {
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
            )
            .returning({ id: proposals.spotifyId });

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

            const proposalData = await getProposal(id);

            await sendEmail(status, {
                songTitle: proposalData.title,
                songArtist: proposalData.artist,
                feedback: proposalData.feedback,
                user_email: proposalData.email,
            });

            return proposalData;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("An unknown error ocurred while updating the proposal status. Please try again later.");
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

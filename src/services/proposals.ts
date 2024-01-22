"use server";

import { countDistinct } from "drizzle-orm";

import {
    DB_LIMIT,
    INITIAL_PAGE,
} from "@/config";
import {
    TProposal,
    TTrackDto,
} from "@/types";
import { formatProposal } from "@/utils";
import { proposals as dbProposals } from "~/db/schema";
import { TProposalDto } from "~/db/schema/proposals";

import db from "./db";
import { getSpotifyAccessToken } from "./spotify";

export const getProposals = async (page = INITIAL_PAGE): Promise<{ tracks: TProposal[], totalCount: number }> => {
    const promises = [
        getSpotifyAccessToken(),
        db.select({ value: countDistinct(dbProposals.spotifyId) }).from(dbProposals),
        db.query.proposals.findMany({
            orderBy: (proposal, { desc }) => desc(proposal.createdAt),
            limit: DB_LIMIT,
            offset: (page || 0) * DB_LIMIT,
        }),
    ];

    console.log("page", page);

    const [
        accessToken,
        countData,
        proposals = [],
    ] = await Promise.all(promises);
    console.log("proposals", proposals);
    const spotifyIds = proposals.map((proposal: TProposalDto) => proposal.spotifyId);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/tracks?ids=${spotifyIds.join(",")}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });
    const { tracks = [] }: { tracks: TTrackDto[] } = await res.json();

    return {
        tracks: tracks.map((track, index) => formatProposal(proposals[index], track)),
        totalCount: !!countData && !!countData.length ? countData[0].value : 0,
    };
};

export const getProposal = async (id: string): Promise<TProposal> => {
    const promises = [
        getSpotifyAccessToken(),
        db.query.proposals.findFirst({
            where: (proposal, { eq }) => eq(proposal.spotifyId, id),
        }),
    ];

    const [
        accessToken,
        proposal,
    ] = await Promise.all(promises);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/tracks/${proposal.spotifyId}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });
    const track = await res.json();

    return formatProposal(proposal, track);
};
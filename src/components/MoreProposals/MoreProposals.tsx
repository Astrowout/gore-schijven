"use client";

import { useSearchParams } from "next/navigation";
import {
    useEffect,
    useState,
} from "react";

import { Proposal } from "@/components/Proposal";
import {
    DB_LIMIT,
    INITIAL_PAGE,
} from "@/config";
import { getProposals } from "@/services/proposals";
import {
    ProposalVariants,
    Routes,
    TProposal,
} from "@/types";

import { Button } from "../Button";
import { ProposalCount } from "../ProposalCount";
import { TMoreProposalsProps } from "./MoreProposals.types";

export default function MoreProposals ({
    totalCount = 0,
    variant = ProposalVariants.Base,
}: TMoreProposalsProps) {
    const [
        tracks,
        setTracks,
    ] = useState<TProposal[]>([]);
    const [
        isLoading,
        setIsLoading,
    ] = useState(false);
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page") || INITIAL_PAGE) || INITIAL_PAGE;
    const count = (page + 1) * DB_LIMIT;
    const activeRoute = variant === ProposalVariants.Base ? Routes.Proposals : Routes.Admin;

    const fetchTracks = async (page: number) => {
        setIsLoading(true);
        const { tracks: newTracks } = await getProposals(page);
        setIsLoading(false);

        setTracks([
            ...tracks,
            ...newTracks,
        ]);
    };

    useEffect(() => {
        const page = Number(searchParams.get("page") || INITIAL_PAGE) || INITIAL_PAGE;

        for (let i = INITIAL_PAGE + 1; i <= page; i++) {
            fetchTracks(i);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {tracks.map((track) => (
                <li key={track.id}>
                    <Proposal
                        variant={variant}
                        {...track}
                    />
                </li>
            ))}

            <div className="flex flex-col items-center gap-y-3">
                {count < totalCount && (
                    <Button
                        isLoading={isLoading}
                        scroll={false}
                        url={`${activeRoute}?page=${page + 1}`}
                        onClick={() => fetchTracks(page + 1)}
                    >
                        Meer vuile ranketank
                    </Button>
                )}

                <ProposalCount
                    count={count}
                    totalCount={totalCount}
                />
            </div>
        </>
    );
};
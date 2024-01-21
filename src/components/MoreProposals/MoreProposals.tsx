"use client";

import { useRouter } from "next/navigation";
import {
    useEffect,
    useState,
} from "react";

import { Proposal } from "@/components/Proposal";
import { INITIAL_PAGE } from "@/config";
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
    page = INITIAL_PAGE,
    count = 0,
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
    const router = useRouter();
    const activeRoute = variant === ProposalVariants.Base ? Routes.Proposals : Routes.Admin;

    const loadMoreTracks = async () => {
        setIsLoading(true);
        const { tracks: newTracks } = await getProposals(page + 1);
        setIsLoading(false);

        setTracks([
            ...tracks,
            ...newTracks,
        ]);

        router.replace(`${activeRoute}?page=${page + 1}`, { scroll: false });
    };

    useEffect(() => {
        if (page > INITIAL_PAGE) {
            router.replace(activeRoute);
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
                        onClick={loadMoreTracks}
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
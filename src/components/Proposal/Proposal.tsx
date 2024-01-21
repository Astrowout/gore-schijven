"use client";

import clsx from "clsx";
import { formatRelative } from "date-fns";
import { nl } from "date-fns/locale";
import {
    memo,
    useEffect,
    useState,
} from "react";

import { StatusTag } from "@/components/StatusTag";
import { updateProposalStatus } from "@/services/actions";
import { LoaderStore } from "@/store";
import {
    ProposalVariants,
    Status,
} from "@/types";
import {
    ConditionalWrapper,
    ConfettiTypes,
    getStatusLabel,
    getStatusSelectClasses,
    shootConfetti,
} from "@/utils";

import { Feedback } from "../Feedback";
import { Select } from "../Select";
import { Tooltip } from "../Tooltip";
import { TrackPreview } from "../TrackPreview";
import { ProposalProps } from "./Proposal.types";

export default memo(function Proposal ({
    id = "",
    likes = 0,
    dislikes = 0,
    spotifyUrl = "",
    status = Status.TO_BE_REVIEWED,
    createdTime = "",
    artist = "",
    title = "",
    albumCover,
    previewUrl = "",
    albumCoverPreviewUrl = "",
    variant = ProposalVariants.Base,
}: ProposalProps) {
    const [
        date,
        setDate,
    ] = useState<string>("");
    const [
        error,
        setError,
    ] = useState<string>("");
    const [
        activeStatus,
        setActiveStatus,
    ] = useState(status);
    const { setLoadingState } = LoaderStore();

    useEffect(() => {
        setDate(formatRelative(new Date(createdTime), new Date(), { locale: nl }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const sendFeedback = async (status: Status) => {
        try {
            setLoadingState(true);
            await updateProposalStatus(id, status);

            setActiveStatus(status);
            shootConfetti(ConfettiTypes.HEARTS);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoadingState(false);
        }
    };

    const selectStatus = (status: Status) => {
        setError("");

        if (window.confirm("Are you sure you want to change the status of this proposal? If the track is approved or rejected, the user will get an email with AI generated feedback.")) {
            sendFeedback(status);
        }
    };

    return (
        <article className='flex flex-col'>
            <TrackPreview
                albumCover={albumCover}
                albumCoverPreviewUrl={albumCoverPreviewUrl}
                artistsLine={artist}
                id={id}
                name={title}
                preview={previewUrl}
                spotifyUrl={spotifyUrl}
            />

            <div className='mt-3 flex flex-col items-start justify-between gap-x-4 gap-y-3 sm:flex-row'>
                <div className='flex flex-col items-start'>
                    <p
                        className={clsx("text-base text-gray-500 transition", {
                            "blur-sm": !date,
                        })}
                    >
                        {date || "Unknown date"}
                    </p>

                    {variant === ProposalVariants.Base && (
                        <StatusTag
                            className="mt-1.5"
                            status={status}
                        >
                            {getStatusLabel(status)}
                        </StatusTag>
                    )}

                    {variant === ProposalVariants.Admin && (
                        <>
                            <ConditionalWrapper
                                condition={activeStatus !== Status.TO_BE_REVIEWED}
                                wrapper={children => (
                                    <Tooltip content="You can&apos;t change the status of a proposal that has been reviewed in the past.">
                                        {children}
                                    </Tooltip>
                                )}
                            >
                                <Select
                                    className={clsx("mt-1.5", getStatusSelectClasses(activeStatus))}
                                    disabled={activeStatus !== Status.TO_BE_REVIEWED}
                                    name="status"
                                    options={Object.values(Status)}
                                    value={activeStatus}
                                    onValueChange={selectStatus}
                                />
                            </ConditionalWrapper>

                            {error && (
                                <p className="mt-2 max-w-prose text-sm text-red-400">
                                    {error}
                                </p>
                            )}
                        </>
                    )}
                </div>

                <Feedback
                    disabled={variant === ProposalVariants.Admin}
                    dislikes={dislikes}
                    id={id}
                    likes={likes}
                />
            </div>
        </article>
    );
});
"use client";

import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import debounce from "lodash/debounce";
import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { EmptyState } from "@/components/EmptyState";
import { Track } from "@/components/Track";
import { getTracks } from "@/services/spotify";
import { SearchStore } from "@/store";
import { TTrackDto } from "@/types";

import {
    PlaySize,
    TrackSound,
} from "../TrackSound";
import { TSuggestionsProps } from "./Suggestions.types";

export default function Suggestions ({}: TSuggestionsProps) {
    const {
        query,
        setQuery,
        setSelectedTrack,
    } = SearchStore();
    const [
        tracks,
        setTracks,
    ] = useState<TTrackDto[]>([]);

    const fetchTracks = async (value: string) => {
        const newTracks = await getTracks(value);

        setTracks(newTracks);
    };

    const debouncedFetchTracks = useCallback(debounce(fetchTracks, 300), []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (query) {
            debouncedFetchTracks(query);
        }
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelectTrack = (track: TTrackDto) => {
        setSelectedTrack(track);
        setQuery("");
    };

    return (
        <Popover.Content
            align="start"
            avoidCollisions={false}
            className="z-20 max-h-80 w-[var(--radix-popover-trigger-width)] overflow-y-auto rounded-lg border border-gray-800 bg-gray-900 shadow-xl"
            sideOffset={6}
            onOpenAutoFocus={(e) => e.preventDefault()}
        >
            {!tracks.length && (
                <EmptyState message="Geen resultaten gevonden" />
            )}

            {!!tracks.length && (
                <ul className="divide-y divide-gray-800">
                    {tracks.map((track: TTrackDto) => (
                        <li key={track.id}>
                            <div
                                className={clsx("flex w-full cursor-pointer items-center gap-x-3 p-3 hover:bg-gray-800 focus:bg-purple-500/10")}
                                role="button"
                                onClick={() => handleSelectTrack(track)}
                            >
                                <TrackSound
                                    id={track.id}
                                    preview={track.preview_url}
                                    size={PlaySize.Sm}
                                />

                                <Track {...track} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Popover.Content>
    );
};
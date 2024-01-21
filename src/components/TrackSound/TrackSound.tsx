"use client";

import clsx from "clsx";
import {
    memo,
    MouseEvent,
    useEffect,
} from "react";
import useSound from "use-sound";

import { Progress } from "@/components/Progress";
import { PlayerStore } from "@/store";
import { getIsPlaying } from "@/store/player";

import {
    PlaySize,
    TTrackSoundProps,
} from "./TrackSound.types";

export default memo(function TrackSound ({
    className = "",
    id = "",
    preview = "",
    size = PlaySize.Base,
}: TTrackSoundProps) {
    const {
        setPlayingId,
    } = PlayerStore();
    const isPlaying = getIsPlaying(id);
    const [
        play,
        {
            stop,
        },
    ] = useSound(preview, {
        interrupt: true,
        onplay: () => setPlayingId(id),
        onend: () => setPlayingId(""),
        onstop: () => setPlayingId(""),
        format: ["mp3"],
    });

    const handleSound = (e: MouseEvent) => {
        e.stopPropagation();

        if (isPlaying) {
            stop();
        } else {
            play();
        }
    };

    useEffect(() => {
        return () => {
            if (isPlaying) {
                stop();
            }
        };
    }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <span
            className={clsx("relative block shrink-0", className, {
                "w-14 h-14": size === PlaySize.Base,
                "w-6 h-6": size === PlaySize.Sm,
            })}
            data-atropos-offset="20"
        >
            <Progress
                isPlaying={isPlaying}
                size={size === PlaySize.Base ? 72 : 32}
                stroke={size === PlaySize.Base ? 4 : 2}
            />

            {preview && (
                <button
                    className={clsx("relative flex h-full w-full items-center justify-center rounded-full text-gray-400 transition duration-200 hover:text-gray-200 active:scale-90", {
                        "hover:scale-110": !isPlaying,
                    })}
                    type="button"
                    onClick={handleSound}
                >
                    {isPlaying ? (
                        <svg
                            className="h-full w-full"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                fillRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-full w-full"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                fillRule="evenodd"
                            />
                        </svg>
                    )}
                </button>
            )}
        </span>
    );
});
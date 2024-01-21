"use client";

import Atropos from "atropos/react";
import clsx from "clsx";
import Image from "next/image";
import {
    MouseEvent,
    useEffect,
} from "react";

import { Progress } from "@/components/Progress";
import { PlayerStore } from "@/store";

import { AlbumCover } from "../AlbumCover";
import { PlayingDecoration } from "../PlayingDecoration";
import { TrackPreviewProps } from "./TrackPreview.types";

let sound: any = null;

export default function TrackPreview ({
    id = "",
    preview = "",
    name = "",
    artistsLine = "",
    albumCover,
    albumCoverPreviewUrl = "",
    spotifyUrl = "",
}: TrackPreviewProps) {
    const playingId = PlayerStore((state) => state.playingId);
    const setPlayingId = PlayerStore((state) => state.setPlayingId);
    const isPlaying = playingId === id;

    const handleSound = (e: MouseEvent) => {
        e.stopPropagation();

        if (sound && isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const handlePlay = () => {
        if (sound) {
            handlePause();
        }

        sound = new Audio(preview);

        initSoundEvents();

        sound.play();
        setPlayingId(id);
    };

    const handlePause = () => {
        sound.pause();
        sound = null;
        setPlayingId("");
    };

    const initSoundEvents = () => {
        sound.addEventListener("ended", handlePause);
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.removeEventListener("ended", handlePause);
                handlePause();
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Atropos
            activeOffset={16}
            duration={500}
            innerClassName="cursor-pointer rounded-[20px] relative z-20"
            rotateXMax={8}
            rotateYMax={8}
            shadowScale={0}
        >
            <span
                className={clsx("relative block overflow-hidden rounded-[20px] shadow-2xl shadow-gray-900/60 transition-shadow duration-500", {
                    "shadow-none": isPlaying,
                })}
            >
                <Image
                    fill
                    alt=""
                    blurDataURL={albumCoverPreviewUrl}
                    className="absolute inset-0 z-0 flex h-full w-full object-cover blur"
                    placeholder="blur"
                    sizes="20vw"
                    src={albumCover.url}
                />

                <PlayingDecoration isPlaying={isPlaying} />

                <span
                    className={clsx("pointer-events-none absolute inset-1 block rounded-2xl bg-ui-dark transition-opacity duration-500 ease-linear", {
                        "opacity-50 delay-500": isPlaying,
                    })}
                    data-atropos-opacity={isPlaying ? null : "1;0.8"}
                />

                <span className="group relative flex gap-x-6 p-4">
                    <AlbumCover
                        albumCoverPreviewUrl={albumCoverPreviewUrl}
                        alt="name"
                        image={albumCover}
                        isPlaying={isPlaying}
                    />

                    <span
                        className="flex grow flex-col truncate"
                        data-atropos-offset="4"
                    >
                        <p className="text-lg text-white lg:text-xl">
                            <a
                                className="u-clickable decoration-1 underline-offset-2 group-hover:underline"
                                href={spotifyUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {name}
                            </a>
                        </p>

                        <p className="text-gray-400 lg:text-lg">
                            {artistsLine}
                        </p>
                    </span>

                    <span
                        className="relative block h-14 w-14 shrink-0 self-end"
                        data-atropos-offset="20"
                    >
                        <Progress
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            isPlaying={isPlaying}
                            size={72}
                            stroke={4}
                        />

                        {preview && (
                            <button
                                className={clsx("relative flex h-full w-full items-center justify-center text-gray-400 transition duration-200 hover:text-gray-200 active:scale-90", {
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
                </span>
            </span>
        </Atropos>
    );
};
"use client";

import Atropos from "atropos/react";
import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";

import { getIsPlaying } from "@/store/player";

import { AlbumCover } from "../AlbumCover";
import { PlayingDecoration } from "../PlayingDecoration";
import { TrackSound } from "../TrackSound";
import { TrackPreviewProps } from "./TrackPreview.types";

export default memo(function TrackPreview ({
    id = "",
    preview = "",
    name = "",
    artistsLine = "",
    albumCover,
    albumCoverPreviewUrl = "",
    spotifyUrl = "",
}: TrackPreviewProps) {
    const isPlaying = getIsPlaying(id);

    return (
        <Atropos
            activeOffset={16}
            duration={500}
            highlight={false}
            innerClassName="cursor-pointer rounded-[20px] relative z-20"
            rotateTouch={false}
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

                <span className="group relative flex gap-x-4 p-4 sm:gap-x-6">
                    <AlbumCover
                        albumCoverPreviewUrl={albumCoverPreviewUrl}
                        alt="name"
                        image={albumCover}
                        isPlaying={isPlaying}
                    />

                    <span
                        className="flex grow flex-col"
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

                    <TrackSound
                        className="self-end"
                        id={id}
                        preview={preview}
                    />
                </span>
            </span>
        </Atropos>
    );
});
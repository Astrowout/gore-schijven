import Image from "next/image";

import { getArtistsLine } from "@/utils";

import { TrackProps } from "./Track.types";

export default function Track ({
    album,
    name = "",
    artists = [],
    coverSize = "w-12 h-12",
}: TrackProps) {
    const artistsLine = getArtistsLine(artists);

    return (
        <span className="flex max-w-[90%] items-center gap-x-3 text-left text-sm">
            {album && (
                <Image
                    alt={album.name}
                    className={`${coverSize} rounded`}
                    height={album.images[2].height}
                    src={album.images[2].url}
                    width={album.images[2].width}
                />
            )}

            <span className="flex grow flex-col truncate">
                <p className="truncate text-white">
                    {name}
                </p>

                <p className="truncate text-sm text-gray-500">
                    {artistsLine}
                </p>
            </span>
        </span>
    );
};
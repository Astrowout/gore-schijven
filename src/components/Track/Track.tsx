import Image from 'next/image';

import { TrackProps } from "./Track.types";
import { getArtistsLine } from "../../helpers/format";

export default function Track({
    album,
    name = "",
    artists = [],
    coverSize = "w-12 h-12",
}: TrackProps) {
    const artistsLine = getArtistsLine(artists);

    return (
        <span className="flex items-center gap-x-3 text-sm text-left">
            {album && (
                <Image
                    src={album.images[2].url}
                    width={album.images[2].width}
                    height={album.images[2].height}
                    alt={album.name}
                    className={`${coverSize} rounded`}
                />
            )}
    
            <span className="flex flex-col">
                <p className="text-white">
                    { name }
                </p>
        
                <p className="text-sm text-neutral-500">
                    { artistsLine }
                </p>
            </span>
        </span>
    );
};
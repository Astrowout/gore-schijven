import clsx from "clsx";
import Image from "next/image";

import { TAlbumCoverProps } from "./AlbumCover.types";

export default function AlbumCover ({
    className = "",
    alt = "Album cover",
    image,
    isPlaying = false,
    albumCoverPreviewUrl = "",
}: TAlbumCoverProps) {
    if (!image) {
        return null;
    }

    return (
        <div
            className={clsx("relative h-32 w-32", className)}
            data-atropos-offset="10"
        >
            <Image
                fill
                alt=""
                blurDataURL={albumCoverPreviewUrl}
                className={clsx("absolute inset-0 z-0 h-full w-full -translate-x-1 translate-y-1 overflow-hidden rounded-2xl opacity-60 blur-md", {
                    "animate-pulse": isPlaying,
                })}
                placeholder="blur"
                sizes="20vw"
                src={albumCoverPreviewUrl}
            />

            <Image
                alt={alt}
                className='relative z-10 h-full w-full overflow-hidden rounded-xl shadow-xl'
                height={image.height}
                sizes="20vw"
                src={image.url}
                width={image.width}
            />
        </div>
    );
};
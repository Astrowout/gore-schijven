import { TAlbumCover } from "@/types";

export type TrackPreviewProps = {
    id: string;
    preview: string;
    name: string;
    artistsLine: string;
    spotifyUrl: string;
    albumCoverPreviewUrl: string;
    albumCover: TAlbumCover;
}
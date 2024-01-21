import {
    TAlbumCover,
    TComponent,
} from "@/types";

export type TAlbumCoverProps = TComponent & {
    alt: string;
    albumCoverPreviewUrl: string;
    image: TAlbumCover;
    isPlaying: boolean;
}
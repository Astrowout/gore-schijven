import { AlbumType, ArtistType } from "../../types";

export type TrackProps = {
    name: string;
    album?: AlbumType;
    artists?: ArtistType[];
    coverSize?: string;
}
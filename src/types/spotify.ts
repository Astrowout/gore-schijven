import { TAlbum } from "./album";

type TArtist = {
    name: string;
}

type TExternalUrls = {
    spotify: string;
}

export type TTrackDto = {
    id: string;
    name: string;
    external_urls: TExternalUrls;
    artists: TArtist[];
    album: TAlbum;
    preview_url: string;
}
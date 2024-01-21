type TArtist = {
    name: string;
}

export type TAlbumCover = {
    url: string;
    width: number;
    height: number;
};

export type TAlbum = {
    name: string;
    images: TAlbumCover[];
};

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
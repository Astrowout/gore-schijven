export type TAlbumCover = {
    url: string;
    width: number;
    height: number;
};

export type TAlbum = {
    name: string;
    images: TAlbumCover[];
};
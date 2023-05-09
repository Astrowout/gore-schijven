export interface IAlbumImage {
    url: string;
    width: number;
    height: number;
};

export interface IAlbum {
    name: string;
    images: IAlbumImage[];
};
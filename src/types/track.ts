export interface IAlbumImage {
    url: string;
    width: number;
    height: number;
};

export interface IAlbum {
    name: string;
    images: IAlbumImage[];
};

export interface IArtist {};

export type ITrack = {
    id: string;
    title: string;
    artist: string;
    likes: number;
    spotifyUrl: string;
    status: 'To be reviewed' | 'Approved' | 'Rejected';
    createdTime: string;
}
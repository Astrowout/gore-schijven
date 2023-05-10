import { IAlbum } from './album';
import { IArtist } from './artist';

export interface ITrack {
    id: string;
    title: string;
    artist: string;
    likes: number;
    spotifyUrl: string;
    status: 'To be reviewed' | 'Approved' | 'Rejected';
    createdTime: string;
}

interface IExternalUrls {
    spotify: string;
}

export interface ITrackDto {
    id: string;
    name: string;
    external_urls: IExternalUrls;
    artists: IArtist[];
    album: IAlbum;
    preview_url: string;
}
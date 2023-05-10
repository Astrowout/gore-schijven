import { IAlbum } from './album';
import { IArtist } from './artist';

export type ITrack = {
    id: string;
    title: string;
    artist: string;
    likes: number;
    spotifyUrl: string;
    status: 'To be reviewed' | 'Approved' | 'Rejected';
    createdTime: string;
}

export type ITrackDto = {
    id: string;
    name: string;
    artists: IArtist[];
    album: IAlbum;
    preview_url: string;
}
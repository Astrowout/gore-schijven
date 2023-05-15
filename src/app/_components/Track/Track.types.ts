import {
	IAlbum, IArtist,
} from '@/types';

export type TrackProps = {
    name: string;
    album?: IAlbum;
    artists?: IArtist[];
    coverSize?: string;
}
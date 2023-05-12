import { Status } from './status';

export interface IDatabaseRow {
	id: string;
	title: string;
	artist: string;
	spotifyUrl: string;
	email: string;
	likes: number;
	status: Status;
	createdTime: string;
};
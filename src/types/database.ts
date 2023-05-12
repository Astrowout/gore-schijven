export interface IDatabaseRow {
	id: string;
	title: string;
	artist: string;
	spotifyUrl: string;
	email: string;
	likes: number;
	status: 'To be reviewed' | 'Approved' | 'Rejected';
	createdTime: string;
};
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { DatabaseProps } from '@/config/notion';
import { IDatabaseRow } from '@/types';

export const getArtistsLine = (artists: any[]) => {
	let line = '';

	for (let i = 0; i < artists.length; i++) {
		const artist = artists[i];

		if (i > 0) {
			line += `, ${artist.name}`;
		} else {
			line += artist.name;
		}
	}

	return line;
};

export const formatDatabaseRow = (page: PageObjectResponse): IDatabaseRow => {
	const props = page.properties as any;

	return {
		id: page.id,
		title: props[DatabaseProps.title].title[0].plain_text,
		artist: props[DatabaseProps.artist].rich_text[0].plain_text,
		spotifyUrl: props[DatabaseProps.spotifyUrl].url,
		email: props[DatabaseProps.email].email,
		likes: props[DatabaseProps.likes].number || 0,
		status: props[DatabaseProps.status].status.name,
		createdTime: page.created_time,
	};
};
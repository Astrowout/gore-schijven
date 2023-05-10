import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { DATABASE_PROPS } from '@/config';
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
		title: props[DATABASE_PROPS.title].title[0].plain_text,
		artist: props[DATABASE_PROPS.artist].rich_text[0].plain_text,
		spotifyUrl: props[DATABASE_PROPS.spotifyUrl].url,
		email: props[DATABASE_PROPS.email].email,
		likes: props[DATABASE_PROPS.likes].number || 0,
		status: props[DATABASE_PROPS.status].status.name,
		createdTime: page.created_time,
	};
};
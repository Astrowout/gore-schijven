'use server';

import { notion, getArtistsLine } from '@/utils';
import { DATABASE_ID } from '@/config';
import { ITrackDto } from '@/types';

export async function createNotionPage(track: ITrackDto, email: string) {
	try {
		const res = await notion.pages.create({
			'parent': {
				'type': 'database_id',
				'database_id': DATABASE_ID,
			},
			'properties': {
				'Title': {
					'title': [
						{
							'type': 'text',
							'text': {
								'content': track.name,
							},
						},
					],
				},
				'Artist': {
					'rich_text': [
						{
							'type': 'text',
							'text': {
								'content': getArtistsLine(track.artists),
							},
						},
					],
				},
				'Spotify URL': {
					'url': track.external_urls.spotify,
				},
				'Likes': {
					'number': 0,
				},
				'Email contributor': {
					'email': email,
				},
				'Status': {
					'status': {
						'name': 'To be reviewed',
					},
				},
			},
		});

		return res;
	} catch (error: any) {
		throw new Error(error);
	}
}
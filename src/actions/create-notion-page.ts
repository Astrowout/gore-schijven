'use server';

import { revalidatePath } from 'next/cache';

import { notion, getArtistsLine } from '@/utils';
import { DATABASE_IDS } from '@/config';
import { ITrackDto } from '@/types';
import { isFullPage } from '@notionhq/client';

export async function createNotionPage(track: ITrackDto, email: string) {
	try {
		const res = await notion.pages.create({
			'parent': {
				'type': 'database_id',
				'database_id': DATABASE_IDS.PROPOSALS,
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

		revalidatePath('/proposals');

		if (isFullPage(res)) {
			return res;
		} else {
			throw new Error('Couldn\'t create page');
		}
	} catch (error: any) {
		throw new Error(error);
	}
}
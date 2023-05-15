'use server';

import { DATABASE_IDS } from '@/config';
import {
	Status,
	ITrackDto,
} from '@/types';
import {
	notion,
	getArtistsLine,
} from '@/utils';
import { isFullPage } from '@notionhq/client';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function createNotionPage(track: ITrackDto, email: string) {
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
					'name': Status.TO_BE_REVIEWED,
				},
			},
		},
	});

	if (isFullPage(res)) {
		revalidateTag('proposals');

		return res;
	} else {
		throw new Error('Couldn\'t create page');
	}
}
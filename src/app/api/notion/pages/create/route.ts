export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { isFullPage } from '@notionhq/client';

import {
	notion,
	getArtistsLine,
} from '@/utils';
import { DATABASE_IDS } from '@/config';
import { Status } from '@/types';

export async function POST(request: Request) {
	const body = await request.json();

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
							'content': body.track.name,
						},
					},
				],
			},
			'Artist': {
				'rich_text': [
					{
						'type': 'text',
						'text': {
							'content': getArtistsLine(body.track.artists),
						},
					},
				],
			},
			'Spotify URL': {
				'url': body.track.external_urls.spotify,
			},
			'Likes': {
				'number': 0,
			},
			'Email contributor': {
				'email': body.email,
			},
			'Status': {
				'status': {
					'name': Status.TO_BE_REVIEWED,
				},
			},
		},
	});

	if (isFullPage(res)) {
		return NextResponse.json(res);
	} else {
		throw new Error('Couldn\'t create page');
	}
}
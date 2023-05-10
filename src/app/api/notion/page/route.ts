import { NextResponse } from 'next/server';

export const runtime = 'edge'; // 'nodejs' is the default

import { notion, getArtistsLine } from '@/utils';
import { DATABASE_ID } from '@/config';

export async function POST(request: Request) {
	const body = await request.json();

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
								'content': body.name,
							},
						},
					],
				},
				'Artist': {
					'rich_text': [
						{
							'type': 'text',
							'text': {
								'content': getArtistsLine(body.artists),
							},
						},
					],
				},
				'Spotify URL': {
					'url': body.external_urls.spotify,
				},
				'Likes': {
					'number': 0,
				},
				'Email contributor': {
					'email': body.email,
				},
				'Status': {
					'status': {
						'name': 'To be reviewed',
					},
				},
			},
		});

		return NextResponse.json(res);
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error });
	}
}
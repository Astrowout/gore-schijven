import { NextResponse } from 'next/server';

export const runtime = 'edge'; // 'nodejs' is the default

import { notion } from '@/utils';

export async function POST(request: Request) {
	const body = await request.json();

	try {
		const currentLikes = await notion.pages.properties.retrieve({
			page_id: body.pageId,
			property_id: 'Likes',
		});

		const res = await notion.pages.update({
			'page_id': body.pageId,
			'properties': {
				'Likes': {
					'number': currentLikes.type === 'number' && currentLikes.number ? currentLikes.number + 1 : 1,
				},
			},
		});

		return NextResponse.json(res);
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error });
	}
}
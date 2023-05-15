import { NextResponse } from 'next/server';

import { notion } from '@/utils';

export const runtime = 'edge';

export async function POST(request: Request) {
	const body = await request.json();

	const currentLikes = await notion.pages.properties.retrieve({
		page_id: body.pageId,
		property_id: 'Likes',
	});

	let newLikes = currentLikes.type === 'number' && currentLikes.number ? currentLikes.number : 0;

	if (body.type === 'like') {
		newLikes = newLikes + 1;
	} else if (body.type === 'dislike' && newLikes > 0) {
		newLikes = newLikes - 1;
	}

	const res = await notion.pages.update({
		'page_id': body.pageId,
		'properties': {
			'Likes': {
				'number': newLikes,
			},
		},
	});

	return NextResponse.json(res);
};
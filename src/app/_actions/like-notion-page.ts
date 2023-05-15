'use server';

import { revalidateTag } from 'next/cache';

import { notion } from '@/utils';

export async function likeNotionPage(pageId: string, type: 'like' | 'dislike') {
	const currentLikes = await notion.pages.properties.retrieve({
		page_id: pageId,
		property_id: 'Likes',
	});

	let newLikes = currentLikes.type === 'number' && currentLikes.number ? currentLikes.number : 0;

	if (type === 'like') {
		newLikes = newLikes + 1;
	} else if (type === 'dislike' && newLikes > 0) {
		newLikes = newLikes - 1;
	}

	const res = await notion.pages.update({
		'page_id': pageId,
		'properties': {
			'Likes': {
				'number': newLikes,
			},
		},
	});

	revalidateTag('proposals');

	return res;
}
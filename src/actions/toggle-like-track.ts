'use server';

import { notion } from '@/utils/notion';

export async function toggleLikeTrack(pageId: string, type: 'like' | 'dislike') {
	try {
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

		return res;
	} catch (error: any) {
		throw new Error(error);
	}
}
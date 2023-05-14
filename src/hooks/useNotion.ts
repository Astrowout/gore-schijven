import {
	useEffect, useState,
} from 'react';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// import {
// 	createNotionPage,
// 	toggleLikeTrack,
// } from '@/actions';
import { ITrackDto } from '@/types';

export default function useNotion() {
	const [result, setResult] = useState<PageObjectResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const createPage = async (track: ITrackDto, email: string) => {
		try {
			// setIsLoading(true);

			// const res = await createNotionPage(track, email);

			// if (res) {
			// 	setResult(res);
			// }
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleLike = async (pageId: string, type: 'like' | 'dislike') => {
		try {
			// await toggleLikeTrack(pageId, type);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		return () => {
			setResult(null);
		};
	}, []);

	return {
		result,
		isLoading,
		toggleLike,
		resetResult: () => setResult(null),
		createPage,
	};
}
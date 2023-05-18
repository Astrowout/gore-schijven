import {
	useEffect,
	useState,
} from 'react';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { ITrackDto } from '@/types';
import {
	createNotionPage,
	likeNotionPage,
} from '@/services';

export default function useNotion() {
	const [result, setResult] = useState<PageObjectResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const createPage = async (track: ITrackDto, email: string) => {
		try {
			setIsLoading(true);

			const res = await createNotionPage(track, email);

			if (res) {
				setResult(res);
			}
		} catch (error: any) {
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleLike = async (pageId: string, type: 'like' | 'dislike') => {
		try {
			await likeNotionPage(pageId, type);
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
import {
	useEffect,
	useState,
} from 'react';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { ITrackDto } from '@/types';

export default function useNotion() {
	const [result, setResult] = useState<PageObjectResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const createPage = async (track: ITrackDto, email: string) => {
		try {
			setIsLoading(true);

			const res: any = await fetch('/api/notion/pages/create', {
				method: 'POST',
				body: JSON.stringify({
					track,
					email,
				}),
			});

			if (res) {
				setResult(res);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleLike = async (pageId: string, type: 'like' | 'dislike') => {
		try {
			await fetch('/api/notion/pages/like', {
				method: 'POST',
				body: JSON.stringify({
					pageId,
					type,
				}),
			});
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
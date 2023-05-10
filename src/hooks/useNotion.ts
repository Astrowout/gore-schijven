import { createNotionPage, toggleLikeTrack } from '@/actions';
import { ITrackDto } from '@/types';
import { useEffect, useState } from 'react';

export default function useNotion() {
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const createPage = async (track: ITrackDto, email: string) => {
		try {
			setIsLoading(true);

			await createNotionPage(track, email);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleLike = async (pageId: string, type: 'like' | 'dislike') => {
		try {
			await toggleLikeTrack(pageId, type);
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
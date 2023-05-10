import { useCallback, useEffect, useState } from 'react';

export default function useNotion() {
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const postProposal = useCallback(async (song: any, email: string) => {
		try {
			setIsLoading(true);

			const res = await fetch('/api/notion/page', {
				method: 'POST',
				body: JSON.stringify({
					...song,
					email,
				}),
			});

			const data = await res.json();

			setResult(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const likeProposal = useCallback(async (pageId: string) => {
		try {
			const res = await fetch('/api/notion/like', {
				method: 'POST',
				body: JSON.stringify({
					pageId,
				}),
			});

			const data = await res.json();

			return data;
		} catch (error) {
			console.error(error);
		}
	}, []);

	const dislikeProposal = useCallback(async (pageId: string) => {
		try {
			const res = await fetch('/api/notion/dislike', {
				method: 'POST',
				body: JSON.stringify({
					pageId,
				}),
			});

			const data = await res.json();

			return data;
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		return () => {
			setResult(null);
		};
	}, []);

	return {
		result,
		isLoading,
		likeProposal,
		dislikeProposal,
		resetResult: () => setResult(null),
		postProposal,
	};
}
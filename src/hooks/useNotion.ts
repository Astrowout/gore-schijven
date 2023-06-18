import { useRouter } from 'next/navigation';
import {
	useEffect,
	useRef,
	useState,
} from 'react';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import {
	ITrackDto,
	IUpdateProposalStatusBody,
} from '@/types';
import { LoaderStore } from '@/store';

export default function useNotion() {
	const abortController = useRef<AbortController>();
	const router = useRouter();
	const [result, setResult] = useState<PageObjectResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const setLoadingState = LoaderStore((state) => state.setLoadingState);

	const updateStatus = async (
		notionId: string,
		body: IUpdateProposalStatusBody,
	) => {
		try {
			setLoadingState(true);

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals/${notionId}/status`,
				{
					method: 'POST',
					body: JSON.stringify(body),
				},
			);
			const data = await res.json();

			if (data.id) {
				router.refresh();
			} else if (data.error) {
				throw new Error(data.error);
			}
		} catch (error: any) {
			throw new Error(error);
		} finally {
			setLoadingState(false);
		}
	};

	const createPage = async (track: ITrackDto, email: string) => {
		try {
			setIsLoading(true);

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals`,
				{
					method: 'POST',
					body: JSON.stringify({
						track,
						email,
					}),
				},
			);
			const data = await res.json();

			if (data) {
				setResult(data);

				router.refresh();
			}
		} catch (error: any) {
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleLike = async (pageId: string, type: 'like' | 'dislike') => {
		if (abortController.current) {
			// abort pending requests when new one is fired
			abortController.current.abort();
		}

		try {
			setIsLoading(true);
			abortController.current = new AbortController();

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals/${pageId}/like`,
				{
					method: 'POST',
					body: JSON.stringify({
						type,
					}),
					signal: abortController.current.signal,
				},
			);
			const data = await res.json();

			if (data) {
				router.refresh();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
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
		updateStatus,
		toggleLike,
		resetResult: () => setResult(null),
		createPage,
	};
}

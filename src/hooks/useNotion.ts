import { useRouter } from 'next/navigation';
import {
	useEffect,
	useRef,
	useState,
} from 'react';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import {
	ITrackDto,
	Status,
} from '@/types';
import { LoaderStore } from '@/store';

export default function useNotion() {
	const abortController = useRef<AbortController>();
	const router = useRouter();
	const [result, setResult] = useState<PageObjectResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const setNotionLoading = LoaderStore((state) => state.setNotionLoading);

	const setStatus = async (notionId: string, status: Status) => {
		try {
			setNotionLoading(true);

			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals/${notionId}/status`, {
				method: 'POST',
				body: JSON.stringify({
					status,
				}),
			});
			const data = await res.json();

			if (data.id) {
				return data;
			} else if (data.error) {
				throw new Error(data.error);
			}
		} catch (error: any) {
			throw new Error(error);
		} finally {
			setNotionLoading(false);
		}
	};

	const createPage = async (track: ITrackDto, email: string) => {
		try {
			setIsLoading(true);

			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals`, {
				method: 'POST',
				body: JSON.stringify({
					track,
					email,
				}),
			});
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

			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals/${pageId}/like`, {
				method: 'POST',
				body: JSON.stringify({
					type,
				}),
				signal: abortController.current.signal,
			});
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
		setStatus,
		toggleLike,
		resetResult: () => setResult(null),
		createPage,
	};
}
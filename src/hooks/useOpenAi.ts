import {
	useState,
} from 'react';

import {
	Status,
} from '@/types';
import { PROMPTS } from '@/config';

export default function useOpenAi() {
	const [isLoading, setIsLoading] = useState(false);

	const generateFeedback = async (status: Status) => {
		try {
			setIsLoading(true);

			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai/chat`, {
				method: 'POST',
				body: JSON.stringify({
					prompt: status === Status.APPROVED ? PROMPTS.APPROVED : PROMPTS.REJECTED,
				}),
			});
			const data = await res.json();

			if (data.content) {
				return data.content;
			} else if (data.error) {
				throw new Error(data.error);
			}
		} catch (error: any) {
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		generateFeedback,
	};
}
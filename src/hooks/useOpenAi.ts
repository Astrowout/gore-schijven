import {
	Status,
} from '@/types';
import { PROMPTS } from '@/config';
import { LoaderStore } from '@/store';

export default function useOpenAi() {
	const setFeedbackLoading = LoaderStore((state) => state.setFeedbackLoading);

	const generateFeedback = async (status: Status) => {
		try {
			setFeedbackLoading(true);

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
			setFeedbackLoading(false);
		}
	};

	return {
		generateFeedback,
	};
}
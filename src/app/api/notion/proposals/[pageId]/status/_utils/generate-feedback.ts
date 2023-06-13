import { PROMPTS } from '@/config';
import { Status } from '@/types';

export const generateFeedback = async (status: Status) => {
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
		return null;
	}
};
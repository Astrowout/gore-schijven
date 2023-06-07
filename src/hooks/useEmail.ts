import {
	useState,
} from 'react';

import {
	IFeedbackEmailData,
	Status,
} from '@/types';

export default function useEmail() {
	const [isLoading, setIsLoading] = useState(false);

	const sendEmail = async (status: Status, body: IFeedbackEmailData) => {
		try {
			setIsLoading(true);

			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, {
				method: 'POST',
				body: JSON.stringify({
					status,
					...body,
				}),
			});
			const data = await res.json();

			if (data.success) {
				return data;
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
		sendEmail,
	};
}
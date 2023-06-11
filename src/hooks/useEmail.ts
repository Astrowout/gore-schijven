import { LoaderStore } from '@/store';
import {
	IFeedbackEmailData,
	Status,
} from '@/types';

export default function useEmail() {
	const setEmailLoading = LoaderStore((state) => state.setEmailLoading);

	const sendEmail = async (status: Status, body: IFeedbackEmailData) => {
		try {
			setEmailLoading(true);

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
			setEmailLoading(false);
		}
	};

	return {
		sendEmail,
	};
}
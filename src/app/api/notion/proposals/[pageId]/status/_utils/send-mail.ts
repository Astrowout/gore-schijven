import {
    Status,
    IFeedbackEmailData,
} from '@/types';

export const sendEmail = async (status: Status, body: IFeedbackEmailData) => {
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
        return null;
    }
};
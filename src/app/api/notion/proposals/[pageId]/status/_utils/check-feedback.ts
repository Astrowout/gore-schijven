import { DATABASE_PROPS } from '@/config';
import { notion } from '@/utils';

export const checkFeedback = async (pageId: string) => {
    const reviewSent = await notion.pages.properties.retrieve({
        page_id: pageId,
        property_id: DATABASE_PROPS.reviewSent,
    });

    return reviewSent.type === 'checkbox' ? reviewSent.checkbox : false;
};
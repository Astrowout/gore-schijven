import { isFullPage } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { handleNotionErrors } from './errors';
import { notion } from './notion';

export const getDatabase = async (
    pageId: string,
): Promise<PageObjectResponse['properties'] | undefined> => {
    try {
        const res = await notion.pages.retrieve({
            page_id: pageId,
        });

        if (isFullPage(res)) {
            return res.properties;
        } else {
            throw new Error('Not a full page');
        }
    } catch (error) {
        handleNotionErrors(error);
    }
};
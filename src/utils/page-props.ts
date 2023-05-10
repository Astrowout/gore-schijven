import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export const getPlainText = (
	richText: RichTextItemResponse[],
) => {
	if (!!richText.length) {
		return richText[0].plain_text;
	}

	return '';
};
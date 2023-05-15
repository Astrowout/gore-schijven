import { cache } from 'react';
import { isFullPage } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import {
	handleNotionErrors,
	formatDatabaseRow,
} from '@/utils';
import { IDatabaseRow } from '@/types';

import { notion } from './notion';

export const getDatabase = cache(async (
	databaseId: string,
	filter?: QueryDatabaseParameters['filter'],
): Promise<IDatabaseRow[] | undefined> => {
	try {
		const res = await notion.databases.query({
			database_id: databaseId,
			...(filter && { filter }),
		});

		if (res.object === 'list') {
			return res.results.map((page) => {
				if (isFullPage(page)) {
					return formatDatabaseRow(page);
				} else {
					throw new Error(`Page with id ${page.id} is not a full page!.`);
				}
			});
		} else {
			throw new Error('Not a full database');
		}
	} catch (error) {
		console.error(error);

		handleNotionErrors(error);
	}
});
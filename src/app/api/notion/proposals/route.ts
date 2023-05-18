import { NextResponse } from 'next/server';
import { isFullPage } from '@notionhq/client';

import {
	notion,
	formatDatabaseRow,
} from '@/utils';
import { DATABASE_IDS } from '@/config';

export const runtime = 'edge';

export async function GET() {
	const res = await notion.databases.query({
		database_id: DATABASE_IDS.PROPOSALS,
	});

	const data = res.results.map((page) => {
		if (isFullPage(page)) {
			return formatDatabaseRow(page);
		} else {
			throw new Error(`Page with id ${page.id} is not a full page`);
		}
	});

	return NextResponse.json({
		data,
	});
};
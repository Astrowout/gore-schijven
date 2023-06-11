import { NextResponse } from 'next/server';

import {
	formatDatabaseRow,
	notion,
} from '@/utils';
import { isFullPage } from '@notionhq/client';

export const runtime = 'edge';

export async function POST(request: Request, {
	params,
}: {
    params: { pageId: string };
}) {
	const pageId = params.pageId;
	const body = await request.json();

	const res = await notion.pages.update({
		'page_id': pageId,
		'properties': {
			'Review sent': true,
			'Status': {
				'name': body.status,
			},
		},
	});

	if (isFullPage(res)) {
		return NextResponse.json(formatDatabaseRow(res));
	} else {
		return NextResponse.json({ error: 'Page updated is not a full page' }, { status: 500 });
	}
};
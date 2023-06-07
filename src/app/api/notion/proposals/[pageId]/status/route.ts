import { NextResponse } from 'next/server';

import {
	formatDatabaseRow,
	notion,
} from '@/utils';
import { isFullPage } from '@notionhq/client';
import { Status } from '@/types';

export const runtime = 'edge';

export async function POST(request: Request, {
	params,
}: {
    params: { pageId: string };
}) {
	const pageId = params.pageId;
	const body = await request.json();

	if (body.status !== Status.APPROVED && body.status !== Status.REJECTED) {
		return NextResponse.json({ error: 'Invalid status given in body.' }, { status: 400 });
	}

	const currentStatus = await notion.pages.properties.retrieve({
		page_id: pageId,
		property_id: 'Status',
	});

	if (currentStatus.type === 'status' && currentStatus.status?.name !== Status.TO_BE_REVIEWED) {
		return NextResponse.json({ error: `This proposal has already been reviewed as the current status is '${currentStatus.status?.name}'.` }, { status: 400 });
	}

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
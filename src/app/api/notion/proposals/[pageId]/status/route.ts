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

	if (body.status !== Status.APPROVED || body.status !== Status.REJECTED) {
		throw new Error('Invalid status given in body.');
	}

	const currentStatus = await notion.pages.properties.retrieve({
		page_id: pageId,
		property_id: 'Status',
	});

	if (currentStatus.type === 'status' && currentStatus.status?.name !== Status.TO_BE_REVIEWED) {
		throw new Error(`This proposal has already been reviewed as the current status is '${currentStatus.status?.name}'.`);
	}

	const res = await notion.pages.update({
		'page_id': pageId,
		'properties': {
			'Review sent': {
				'checkbox': true,
			},
			'Status': {
				'number': body.status,
			},
		},
	});

	if (isFullPage(res)) {
		return NextResponse.json(formatDatabaseRow(res));
	} else {
		throw new Error('Page updated is not a full page');
	}
};
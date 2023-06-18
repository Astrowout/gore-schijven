import { NextResponse } from 'next/server';

import {
	formatDatabaseRow,
	notion,
} from '@/utils';
import { isFullPage } from '@notionhq/client';
import { DATABASE_PROPS } from '@/config';

import {
	checkFeedback,
	generateFeedback,
	sendEmail,
} from './_utils';

export const runtime = 'edge';

export async function POST(request: Request, {
	params,
}: {
    params: { pageId: string };
}) {
	const pageId = params.pageId;
	const body = await request.json();

	const reviewSent = await checkFeedback(pageId);
	if (reviewSent) {
		return NextResponse.json({ error: 'Feedback was already provided for this proposal.' }, { status: 400 });
	}

	const feedback = await generateFeedback(body.status);
	if (!feedback) {
		return NextResponse.json({ error: 'Couldn\'t generate feedback.' }, { status: 400 });
	}

	const email = await sendEmail(body.status, {
		...body.metadata,
		feedback,
	});
	if (!email) {
		return NextResponse.json({ error: 'Something went wrong while sending the email.' }, { status: 400 });
	}

	const res = await notion.pages.update({
		'page_id': pageId,
		'properties': {
			[DATABASE_PROPS.reviewSent]: true,
			[DATABASE_PROPS.status]: {
				'name': body.status,
			},
			[DATABASE_PROPS.feedback]: [
				{
					'text': {
						'content': feedback,
					},
				},
			],
		},
	});

	if (isFullPage(res)) {
		return NextResponse.json(formatDatabaseRow(res));
	} else {
		return NextResponse.json({ error: 'Page updated is not a full page' }, { status: 500 });
	}
};
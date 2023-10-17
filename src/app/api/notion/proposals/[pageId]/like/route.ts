import { NextResponse } from 'next/server';

import {
    formatDatabaseRow,
    notion,
} from '@/utils';
import { isFullPage } from '@notionhq/client';
import { DATABASE_PROPS } from '@/config';

export const runtime = 'edge';

export async function POST(request: Request, {
    params,
}: {
    params: { pageId: string };
}) {
    const pageId = params.pageId;
    const body = await request.json();

    const currentLikes = await notion.pages.properties.retrieve({
        page_id: pageId,
        property_id: DATABASE_PROPS.likes,
    });

    let newLikes = currentLikes.type === 'number' && currentLikes.number ? currentLikes.number : 0;

    if (body.type === 'like') {
        newLikes = newLikes + 1;
    } else if (body.type === 'dislike' && newLikes > 0) {
        newLikes = newLikes - 1;
    }

    const res = await notion.pages.update({
        'page_id': pageId,
        'properties': {
            [DATABASE_PROPS.likes]: {
                'number': newLikes,
            },
        },
    });

    if (isFullPage(res)) {
        return NextResponse.json(formatDatabaseRow(res));
    } else {
        throw new Error('Page updated is not a full page');
    }
};
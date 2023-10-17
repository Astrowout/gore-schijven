import { NextResponse } from 'next/server';
import { isFullPage } from '@notionhq/client';

import {
    notion,
    formatDatabaseRow,
    getArtistsLine,
} from '@/utils';
import { Status } from '@/types';
import {
    DATABASE_IDS,
    DATABASE_PROPS,
} from '@/config';

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

export async function POST(request: Request) {
    const body = await request.json();

    const res = await notion.pages.create({
        'parent': {
            'type': 'database_id',
            'database_id': DATABASE_IDS.PROPOSALS,
        },
        'properties': {
            [DATABASE_PROPS.title]: {
                'title': [
                    {
                        'type': 'text',
                        'text': {
                            'content': body.track.name,
                        },
                    },
                ],
            },
            [DATABASE_PROPS.artist]: {
                'rich_text': [
                    {
                        'type': 'text',
                        'text': {
                            'content': getArtistsLine(body.track.artists),
                        },
                    },
                ],
            },
            [DATABASE_PROPS.spotifyUrl]: {
                'url': body.track.external_urls.spotify,
            },
            [DATABASE_PROPS.likes]: {
                'number': 0,
            },
            [DATABASE_PROPS.email]: {
                'email': body.email,
            },
            [DATABASE_PROPS.status]: {
                'status': {
                    'name': Status.TO_BE_REVIEWED,
                },
            },
        },
    });

    if (isFullPage(res)) {
        return NextResponse.json(formatDatabaseRow(res));
    } else {
        throw new Error('Page created is not a full page');
    }
};
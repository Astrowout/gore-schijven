import { Status } from '@/types';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
	const body = await request.json();

	const res = await fetch(`${process.env.SPARKPOST_API_URL}/transmissions`, {
		method: 'POST',
		body: JSON.stringify({
			'content': {
				'template_id': body.status === Status.APPROVED ? 'proposal-approved' : 'proposal-rejected',
			},
			'substitution_data': body,
			'recipients': [
				{
					'address': {
						'email': body.user_email,
					},
				},
			],
		}),
	});

	console.log(res);

	return NextResponse.json(res);
};
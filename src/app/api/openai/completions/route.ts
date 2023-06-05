import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
	const body = await request.json();

	const res = await fetch(`${process.env.OPENAI_API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			'model': 'gpt-3.5-turbo',
			'prompt': body.prompt,
			'temperature': 2,
		}),
	});

	console.log(res);

	return NextResponse.json(res);
};
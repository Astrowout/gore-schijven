import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const OPENAI_MODEL = 'gpt-3.5-turbo'; // Powerful but still cost-effective model

export async function POST(request: Request) {
	const body = await request.json();

	const res = await fetch(`${process.env.OPENAI_API_URL}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			'model': OPENAI_MODEL,
			'messages': [{
				role: 'user',
				content: body.prompt,
			}],
			'max_tokens': 64,
		}),
	});
	const data = await res.json();

	if (data.choices) {
		return NextResponse.json({ content: data.choices[0].message.content }, { status: 200 });
	} else if (data.error) {
		return NextResponse.json({ error: data.error.message }, { status: 500 });
	}
};
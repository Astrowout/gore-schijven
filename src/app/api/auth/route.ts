import {
	NextRequest,
	NextResponse,
} from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
	const body = await request.json();

	if (!body.password) {
		return NextResponse.json({ error: 'Missing password' }, { status: 500 });
	}

	if (body.password !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Invalid password' }, { status: 500 });
	}

	return NextResponse.json({ success: true }, {
		status: 200,
		headers: { 'Set-Cookie': 'authenticated=true; Path=/;' },
	});
};
import {
	NextRequest,
	NextResponse,
} from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const authCookie = request.cookies.get('authenticated');
	const isLoggedIn = authCookie && authCookie.value === 'true';

	if (isLoggedIn) {
		return NextResponse.next();
	}

	url.pathname = '/admin/login';

	return NextResponse.rewrite(url);
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/admin',
};
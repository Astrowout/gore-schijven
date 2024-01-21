import { jwtVerify } from "jose";
import {
    NextRequest,
    NextResponse,
} from "next/server";

import { USER_TOKEN_KEY } from "./config";

const redirect = (url: URL) => {
    url.pathname = "/admin/login";

    return NextResponse.rewrite(url);
};

// This function can be marked `async` if using `await` inside
export async function middleware (request: NextRequest) {
    const url = request.nextUrl;
    const token = request.cookies.get(USER_TOKEN_KEY)?.value;

    if (!token) {
        return redirect(url);
    }

    try {
        await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET_KEY)
	  	);

        return NextResponse.next();
    } catch (error) {
        console.log(error);

        return redirect(url);
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/admin",
};
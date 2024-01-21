import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import {
    NextRequest,
    NextResponse,
} from "next/server";

import { USER_TOKEN_KEY } from "@/config";

export const runtime = "edge";

export async function POST (request: NextRequest) {
    const body = await request.json();

    if (!body.password) {
        return NextResponse.json({ error: "Unauthorized. Missing password" }, { status: 401 });
    }

    if (body.password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Unauthorized. Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true }, { status: 200 });

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const token = await new SignJWT({})
            .setProtectedHeader({ alg: "HS256" })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(secret);

        response.cookies.set(USER_TOKEN_KEY, token);

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong signing the user token." }, { status: 500 });
    }
};
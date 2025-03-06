import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
	const tokenCookie = request.cookies.get("token");

	if (!tokenCookie) {
		return NextResponse.redirect(new URL("/register", request.url));
	}

	try {
		await jwtVerify(
			tokenCookie.value,
			new TextEncoder().encode("tu_super_secreto_seguro")
		);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/registerss", request.url));
	}
}

export const config = {
	matcher: ["/", "/documents/:path*"],
};

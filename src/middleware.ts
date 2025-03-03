import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * Middleware to verify if the user is authenticated
 *
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
	const jwt = request.cookies.get("token");

	console.log(jwt);
	if (!jwt) return NextResponse.redirect(new URL("/register", request.url));

	try {
		await jwtVerify(
			jwt.value,
			new TextEncoder().encode("tu_super_secreto_seguro")
		);

		return NextResponse.next();
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(new URL("/registersss", request.url));
	}
}

export const config = {
	matcher: ["/", "/documents/:path*"],
};

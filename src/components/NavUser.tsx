"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { UserResponse } from "@/types/user.interfaces";

/**
 * this component is used to display the user's information in the navigation bar
 * @returns
 */
export default function NavUser() {
	const [hasHydrated, setHasHydrated] = useState(false);
	const [decodedToken, setDecodedToken] = useState<UserResponse | null>(null);

	useEffect(() => {
		setHasHydrated(true);

		const sessionToken = Cookies.get("token");
		if (sessionToken) {
			const decoded = jwt.decode(sessionToken);
			if (decoded && typeof decoded === "object") {
				setDecodedToken(decoded as UserResponse);
			}
		}
	}, []);

	if (!hasHydrated) return null;
	if (!decodedToken) return null;

	const { username, profilePic } = decodedToken;

	return (
		<div className="flex items-center gap-4">
			<Image
				src={
					profilePic
						? String(profilePic)
						: "https://i.pinimg.com/564x/9d/6b/9d/9d6b9db2dcb0526a09b89fb35d075c72.jpg"
				}
				alt="avatar"
				className="rounded-full size-12"
				width={48}
				height={48}
			/>
			<h3 className="text-xl font-semibold">
				{username ? username : "Usuario sin nombre"}
			</h3>
			<span className="ml-auto">···</span>
		</div>
	);
}

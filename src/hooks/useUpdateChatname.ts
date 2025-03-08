import { UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useCallback } from "react";

export function useUpdateChatname() {
	return useCallback(async (chatId: string, chatName: string) => {
		const token = Cookies.get("token");
		if (!token) throw new Error("No se encontró el token");

		const decoded = jwt.decode(token) as UserResponse;
		if (!decoded?.userId) throw new Error("Token inválido");

		const res = await axios.patch(
			`${servers.local_api}/api/v1/users/update-chatname/${decoded.userId}/chat/${chatId}`,
			{ title: chatName },
			{ headers: { auth: token } }
		);
		return res.data;
	}, []);
}

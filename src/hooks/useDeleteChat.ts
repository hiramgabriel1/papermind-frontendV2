import { UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useCallback } from "react";

/**
 * Hook para obtener una función que elimine un chat
 * @returns {(chatId: string) => Promise}
 */
export function useDeleteChat() {
	const deleteChat = useCallback(async (chatId: string) => {
		try {
			const token = Cookies.get("token");
			if (!token) {
				throw new Error("No se encontró la cookie 'token'");
			}

			const decoded = jwt.decode(token) as UserResponse;
			if (!decoded?.userId) {
				throw new Error("No se encontró el userId en el token");
			}

			const response = await axios.delete(
				`${servers.local_api}/api/v1/users/delete-chat/${decoded.userId}/chat/${chatId}`,
				{
					headers: {
						auth: token,
					},
				}
			);

			return response.data;
		} catch (error) {
			throw error;
		}
	}, []);

	return deleteChat;
}

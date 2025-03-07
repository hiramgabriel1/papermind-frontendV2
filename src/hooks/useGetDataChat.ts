import { UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

/**
 * Obtiene los datos de un chat
 * @param chatId - ID del chat
 * @returns Datos del chat
 */
export async function getDataChat(chatId: string) {
	try {
		const tokenCookie = Cookies.get("token");
		if (!tokenCookie) {
			throw new Error("No existe la cookie 'token'");
		}

		const decodedToken = jwt.decode(String(tokenCookie));
		if (!decodedToken) {
			throw new Error("Token inválido");
		}

		const { userId } = decodedToken as UserResponse;

		const response = await axios.get(
			`${servers.local_api}/api/v1/users/chat-user/${userId}/${chatId}`,
			{
				headers: {
					auth: tokenCookie,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error en getDataChat:", error);
	}
}

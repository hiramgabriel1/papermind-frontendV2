import { UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

/**
 * Hook para encontrar un archivo
 * @param chatId - ID del chat
 * @returns Archivo encontrado
 */
export const useFindFile = async (chatId: number) => {
	const cookieToken = Cookies.get("token");
	if (!cookieToken) {
		throw new Error("No existe la cookie 'token'");
	}

	const decodedToken = jwt.decode(cookieToken);
	if (!decodedToken || typeof decodedToken !== "object") {
		throw new Error("El token no es válido");
	}

	const { userId } = decodedToken as UserResponse;

	try {
		const response = await axios.get(
			`${servers.local_api}/api/v1/users/chat-user/${userId}/${chatId}`,
			{
				headers: {
					auth: cookieToken,
				},
			}
		);

		const data = await response.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

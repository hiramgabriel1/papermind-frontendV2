import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { UserResponse } from "@/types/user.interfaces";
import axios from "axios";
import { servers } from "@/utils/servers";

/**
 * this hook is used to query the chat
 */

export const useQueryChat = async (queryMessage: string, chatId: string) => {
	const cookieToken = Cookies.get("token");

	if (!cookieToken) throw new Error("No existe la cookie 'token'");

	const decodedToken = jwt.decode(cookieToken);

	const { userId } = decodedToken as UserResponse;

	const response = await axios.post(
		`${servers.local_api}/api/v1/users/chat-query/user/${userId}/chat/${chatId}`,
		{ queryMessage },
		{
			headers: {
				auth: cookieToken,
			},
		}
	);

	if (response.status !== 200) return response.status;

	return response.data;
};

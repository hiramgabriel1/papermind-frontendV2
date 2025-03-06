import { useCallback } from "react";
import { servers } from "@/utils/servers";
import { UserResponse } from "@/types/user.interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

/**
 * Hook para obtener los documentos de un usuario
 * @returns {Object} - Objeto con la función getDocuments
 */
export const useGetDocuments = () => {
	const cookieToken = Cookies.get("token");
	if (!cookieToken) {
		throw new Error("No existe la cookie 'token'");
	}

	const decodedToken = jwt.decode(cookieToken);
	if (!decodedToken || typeof decodedToken !== "object") {
		throw new Error("El token no es válido");
	}

	const { userId } = decodedToken as UserResponse;

	const getDocuments = useCallback(
		async (page: number = 1, limit: number = 5) => {
			const response = await axios.get(
				`${servers.local_api}/api/v1/users/view-documents/${userId}?page=${page}&limit=${limit}`,
				{
					headers: {
						auth: cookieToken,
					},
				}
			);

			if (response.status === 200) {
				return response.data;
			}
			return { error: response.data };
		},
		[userId, cookieToken]
	);

	return { getDocuments };
};

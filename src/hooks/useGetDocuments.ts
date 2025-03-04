import { servers } from "@/utils/servers";
import { UserResponse } from "@/types/user.interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

/**
 * This hook is used to get the documents
 * @returns
 */
export const useGetDocuments = () => {
	const cookieToken = Cookies.get("token");
	if (!cookieToken) {
		throw new Error("No existe la cookie 'token'");
	}

	const decodedToken = jwt.decode(cookieToken);
	console.log("Decoded token:", decodedToken);

	if (!decodedToken || typeof decodedToken !== "object") {
		throw new Error("El token no es válido");
	}

	const { userId } = decodedToken as UserResponse;

	const getDocuments = async () => {
		const response = await axios.get(
			`${servers.local_api}/api/v1/users/view-directories/${userId}`,
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
	};

	return { getDocuments };
};

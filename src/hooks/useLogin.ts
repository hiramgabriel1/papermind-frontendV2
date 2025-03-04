import { User, UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";

/**
 * This hook is used to login a user
 * @param data - The user data
 * @returns The user data
 */
export const useLogin = async (data: User) => {
	try {
		const response = await axios.post<UserResponse>(
			`${servers.local_api}/api/v1/users/auth-user/`,
			data
		);

		if (response.status !== 200) {
			throw new Error("Error al iniciar sesión");
		}

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

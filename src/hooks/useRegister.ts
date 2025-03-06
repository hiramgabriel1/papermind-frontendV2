import { User, UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";

/**
 * This hook is used to register a new user
 * @param data - The user data
 * @returns The user data
 */
export const useRegister = async (data: User) => {
	try {
		const response = await axios.post<UserResponse>(
			`${servers.local_api}/api/v1/users/create-user/`,
			data
		);

		if (response.status !== 201) {
			throw new Error("Error al registrar usuario");
		}

		return response.data;
	} catch (error) {}
};

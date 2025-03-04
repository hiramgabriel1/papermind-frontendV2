"use client";

import { useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { servers } from "@/utils/servers";
import jwt from "jsonwebtoken";
import { UserResponse } from "@/types/user.interfaces";

/**
 * this hook is used to create a new chat
 * @returns
 */
export function useCreateChat() {
	const createChat = useCallback(async (formData: FormData) => {
		try {
			const token = Cookies.get("token");
			if (!token) {
				throw new Error("No se encontró la cookie 'token'");
			}

			const decoded = jwt.decode(token);
			const { userId } = decoded as UserResponse;

			if (!userId) {
				throw new Error("No se encontró el userId en el token");
			}

			const response = await axios.post(
				`${servers.local_api}/api/v1/users/create-chat/${userId}`,
				formData,
				{
					headers: {
						auth: token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status !== 201) {
				throw new Error("Error al crear el chat");
			}

			return response.data;
		} catch (error) {
			console.error("Error en useCreateChat:", error);
			throw error;
		}
	}, []);

	return createChat;
}

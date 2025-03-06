import { UserResponse } from "@/types/user.interfaces";
import { servers } from "@/utils/servers";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

/**
 * Hook para subir un documento o directorio
 * @param data - FormData con el archivo y otros datos
 * @returns Respuesta de la API
 */
export const useUploadDocument = () => {
	const uploadDocument = async (data: FormData) => {
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
			const response = await axios.post(
				`${servers.local_api}/api/v1/users/documents/upload/${userId}`,
				data,
				{
					headers: {
						auth: cookieToken,
					},
				}
			);

			if (response.status !== 201) {
				throw new Error("Error al subir el documento");
			}

			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	return uploadDocument;
};

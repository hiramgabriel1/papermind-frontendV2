import { servers } from "@/utils/servers";
import axios from "axios";
import Cookies from "js-cookie";

/**
 * Hook para eliminar un documento
 * @returns
 */
export const useDeleteDocument = () => {
	const cookieToken = Cookies.get("token");
	if (!cookieToken) {
		throw new Error("No existe la cookie 'token'");
	}

	const deleteDocument = async (userId: number, documentId: number) => {
		try {
			const response = await axios.delete(
				`${servers.local_api}/api/v1/users/delete-document/${userId}/document/${documentId}`,
				{
					headers: {
						auth: `${cookieToken}`,
					},
				}
			);

			if (response.status !== 200) {
				throw new Error("Error al eliminar el documento");
			}

			return response.data;
		} catch (error) {
			console.error("Error en useDeleteDocument:", error);
			throw error;
		}
	};

	return deleteDocument;
};

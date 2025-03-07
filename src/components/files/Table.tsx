import React, { useState, useEffect } from "react";
import { IDocument } from "@/types/Documents.interfaces";
import { DeleIcon, DirectoryIcon, EditIcon, FileIcon } from "../Icons";
import moment from "moment";
import { useDeleteDocument } from "@/hooks/useDeleteDocument";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { UserResponse } from "@/types/user.interfaces";
import { toast, ToastContainer } from "react-toastify";

interface TableProps {
	directoryData: IDocument | null;
}

/**
 * Tabla de documentos
 * @param directoryData - Datos de los documentos
 * @returns Tabla de documentos
 */
export default function Table({ directoryData }: TableProps) {
	const token = Cookies.get("token");
	const deleteDocument = useDeleteDocument();

	const decodedToken = jwt.decode(String(token));
	const { userId } = decodedToken as UserResponse;

	const [localData, setLocalData] = useState<IDocument | null>(directoryData);

	useEffect(() => {
		setLocalData(directoryData);
	}, [directoryData]);

	const handleDelete = async (docId: number) => {
		try {
			await deleteDocument(userId, docId);
			toast.success("Documento eliminado exitosamente");

			if (localData) {
				setLocalData({
					...localData,
					directories: localData.directories.filter((doc) => doc.id !== docId),
				});
			}
		} catch (error) {
			toast.error(`Error al borrar documento: ${error}`);
		}
	};

	if (!localData?.directories) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-gray-500">No hay documentos por mostrar</p>
			</div>
		);
	}

	return (
		<>
			<ToastContainer />
			<div className="w-full">
				<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
						<table className="min-w-full leading-normal">
							<thead>
								<tr>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Nombre
									</th>
									<th className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Fecha de creación
									</th>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Editar
									</th>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Borrar
									</th>
								</tr>
							</thead>
							<tbody>
								{localData.directories.map((doc) => {
									const Icon =
										doc.typeDocument === "directory" ? DirectoryIcon : FileIcon;
									return (
										<tr key={doc.id}>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<div className="flex items-center">
													<div className="flex-shrink-0 w-10 h-10">
														<Icon />
													</div>
													<div className="ml-3">
														<p className="text-gray-900 whitespace-no-wrap">
															{doc.titleDirectory || doc.fileUrl}
														</p>
													</div>
												</div>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">
													{moment(doc.createdAt).format("MMM D, YYYY")}
												</p>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
													<EditIcon />
												</button>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<button
													onClick={() => handleDelete(doc.id)}
													className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												>
													<DeleIcon />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

import React from "react";
import { IDocument } from "@/types/Documents.interfaces";
import { DirectoryIcon, FileIcon } from "../Icons";
import moment from "moment";

interface TableProps {
	directoryData: IDocument | null;
}

/**
 * Componente para mostrar la tabla de archivos
 * @param directoryData - Datos de los archivos
 * @returns Componente de la tabla
 */
export default function Table({ directoryData }: TableProps) {
	if (!directoryData?.directories) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-gray-500">No hay archivos</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Nombre
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Tamaño
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Fecha de creación
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Borrar
								</th>
							</tr>
						</thead>
						<tbody>
							{directoryData.directories.map((doc) => {
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
														{doc.titleDirectory || "archivo.pdf"}
													</p>
												</div>
											</div>
										</td>
										<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												43.200kb
											</p>
										</td>
										<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{moment(doc.createdAt).format("MMM D, YYYY")}
											</p>
										</td>
										<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
												Borrar
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
	);
}

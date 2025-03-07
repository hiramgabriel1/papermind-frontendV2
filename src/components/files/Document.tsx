"use client";

import React, { useEffect, useState } from "react";
import CreateFile from "./CreateFile";
import UploadFile from "../UploadFile";
import Table from "./Table";
import Pagination from "../Pagination";
import { useGetDocuments } from "@/hooks/useGetDocuments";
import { IDocument } from "@/types/Documents.interfaces";

/**
 * Componente de documentos
 * @returns Componente de documentos
 */
export default function Document() {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenUpload, setIsOpenUpload] = useState(false);

	const [documents, setDocuments] = useState<IDocument | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(10);
	const [total, setTotal] = useState(0);

	const { getDocuments } = useGetDocuments();

	const fetchDocuments = async () => {
		const data = await getDocuments(currentPage, limit);
		setDocuments(data);
		if (data.total) {
			setTotal(data.total);
		}
	};

	useEffect(() => {
		fetchDocuments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, limit]);

	const handleRefresh = () => fetchDocuments();

	return (
		<main>
			<section className={`${isOpen ? "blur z-10" : ""}`}>
				<div className="flex justify-between">
					<div>
						<h3 className="font-semibold text-2xl">Documentos</h3>
						<p className="text-gray-500">Mira todos tus archivos aquí.</p>
					</div>
					<div className="flex space-x-4 justify-center">
						<div>
							<button
								className="px-3 py-2 border border-gray-500 rounded-lg"
								onClick={() => setIsOpen(true)}
							>
								Crear carpeta
							</button>
						</div>
						<div>
							<button
								className="px-3 py-2 border border-gray-500 bg-black text-white rounded-lg"
								onClick={() => setIsOpenUpload(true)}
							>
								Subir
							</button>
						</div>
					</div>
				</div>
				<div className="flex space-x-3 py-6">
					<input
						type="text"
						name="search"
						placeholder="Buscar archivo..."
						className="border border-gray-500 px-3 rounded-lg text-gray-500"
					/>
					<select
						name="filter"
						id="filter"
						defaultValue={1}
						className="border border-gray-500 px-3 text-gray-500 rounded-lg"
					>
						<option value="1">Todos</option>
						<option value="2">Recientes</option>
						<option value="3">3 meses antes</option>
						<option value="4">6 meses antes</option>
					</select>
				</div>
			</section>

			{isOpen && (
				<CreateFile
					onClose={() => setIsOpen(false)}
					onCreated={handleRefresh}
				/>
			)}
			{isOpenUpload && (
				<UploadFile
					onClose={() => setIsOpenUpload(false)}
					onUploaded={handleRefresh}
				/>
			)}

			{documents ? (
				<>
					<Table directoryData={documents} />
					<Pagination
						currentPage={currentPage}
						total={total}
						limit={limit}
						onPageChange={setCurrentPage}
					/>
				</>
			) : (
				<p>Cargando documentos...</p>
			)}
		</main>
	);
}

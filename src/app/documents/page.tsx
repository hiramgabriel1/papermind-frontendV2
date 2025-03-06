"use client";

import { useGetDocuments } from "@/hooks/useGetDocuments";
import { useEffect, useState } from "react";
import Table from "../../components/files/Table";
import Document from "../../components/files/Document";
import { IDocument } from "@/types/Documents.interfaces";

/**
 * This is the main page for the documents
 * @returns
 */
export default function Documents() {
	const { getDocuments } = useGetDocuments();
	const [documents, setDocuments] = useState<IDocument[] | null>(null);

	useEffect(() => {
		getDocuments()
			.then((data) => setDocuments(data))
			.catch();
	}, []);

	if (!documents) {
		return <div>Cargando documentos...</div>;
	}

	return (
		<div>
			<Document />
			<Table directoryData={documents} />
		</div>
	);
}

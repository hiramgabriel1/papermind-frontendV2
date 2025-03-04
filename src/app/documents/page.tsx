"use client";

import { useGetDocuments } from "@/hooks/useGetDocuments";
import { useEffect } from "react";
import Table from "../../components/files/Table";
import Document from "../../components/files/Document";

/**
 * This page is used to display the documents
 * @returns
 */
export default function Documents() {
	const { getDocuments } = useGetDocuments();

	useEffect(() => {
		getDocuments();
	}, []);

	return (
		<div>
			<Document />
			<Table />
		</div>
	);
}

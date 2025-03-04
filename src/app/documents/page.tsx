"use client";

import { useGetDocuments } from "@/hooks/useGetDocuments";
import { useEffect } from "react";
/**
 * This page is used to display the documents
 * @returns
 */
export default function Documents() {
	const { getDocuments } = useGetDocuments();

	useEffect(() => {
		getDocuments();
	}, []);

	return <h2 className="text-3xl font-semibold">Documentos</h2>;
}

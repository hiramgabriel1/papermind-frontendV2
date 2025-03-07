"use client";
import React from "react";

interface PreviewProps {
	pdfUrl: string;
}
/**
 * Componente de vista previa del PDF
 * @param pdfUrl - URL del PDF
 * @returns Componente de vista previa del PDF
 */
export default function Preview({ pdfUrl }: PreviewProps) {
	return (
		<div>
			<iframe
				src={pdfUrl}
				style={{ width: "100%", height: "90vh", border: "1px solid #ccc" }}
				title="Vista previa del PDF"
			/>
		</div>
	);
}

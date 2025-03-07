"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadDocumentProps } from "@/types/Documents.interfaces";
import { useUploadDocument } from "@/hooks/useUploadDocument";
import { toast } from "react-toastify";

interface UploadFileProps {
	onClose: () => void;
	onUploaded: () => void; // Nuevo callback
}

/**
 * Componente para subir un archivo
 */
export default function UploadFile({ onClose, onUploaded }: UploadFileProps) {
	const { register, handleSubmit } = useForm<UploadDocumentProps>();
	const uploadDocument = useUploadDocument();

	const onSubmit: SubmitHandler<UploadDocumentProps> = async (formData) => {
		formData.typeDocument = "file";
		await uploadDocument(formData);

		toast.success("Archivo subido correctamente");
		// 1. Llamamos al callback
		onUploaded();
		// 2. Cerramos el modal
		onClose();
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Subir archivo</h3>
					<button
						className="text-gray-600 hover:text-gray-800 p-2"
						onClick={onClose}
					>
						✖
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Tu input file o campos necesarios */}
					<input
						type="file"
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black my-2"
						{...register("document", { required: true })}
					/>
					<button className="bg-black text-white p-2 rounded-lg w-full hover:bg-gray-800 transition mt-12">
						Subir
					</button>
				</form>
			</div>
		</div>
	);
}

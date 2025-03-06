import { useUploadDocument } from "@/hooks/useUploadDocument";
import { UploadDocumentProps } from "@/types/Documents.interfaces";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

interface CreateFileProps {
	onClose: () => void;
}

/**
 * Componente para crear una carpeta
 * @param onClose - Función para cerrar el componente
 * @returns Componente de creación de carpeta
 */
export default function CreateFile({ onClose }: CreateFileProps) {
	const { register, handleSubmit } = useForm<UploadDocumentProps>();

	const uploadDocument = useUploadDocument();
	const onSubmit: SubmitHandler<UploadDocumentProps> = async (formData) => {
		formData.typeDocument = "directory";
		await uploadDocument(formData);

		toast.success("Carpeta creada correctamente");
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Nueva carpeta</h3>
					<button
						className="text-gray-600 hover:text-gray-800 p-2"
						onClick={onClose}
					>
						✖
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Nombre de la carpeta"
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black my-2"
						{...register("titleDirectory", { required: true })}
					/>
					<button className="bg-black text-white p-2 rounded-lg w-full hover:bg-gray-800 transition mt-12">
						Crear
					</button>
					<ToastContainer />
				</form>
			</div>
		</div>
	);
}

import React from "react";
import { CloseIcon } from "./Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadDocumentProps } from "@/types/Documents.interfaces";
import { useUploadDocument } from "@/hooks/useUploadDocument";

/**
 * Componente para subir un archivo
 */
interface UploadFileProps {
	onClose: () => void;
}

function UploadFile({ onClose }: UploadFileProps) {
	const { register, handleSubmit } = useForm<UploadDocumentProps>();

	// Llama a la función retornada por el hook.
	const uploadDocument = useUploadDocument();

	const onSubmit: SubmitHandler<UploadDocumentProps> = async (data) => {
		data.typeDocument = "file";

		const fileList = data.document;
		if (!fileList || fileList.length === 0) {
			console.error("No se seleccionó ningún archivo");
			return;
		}
		const file = fileList[0];

		const formData = new FormData();
		formData.append("document", file);
		formData.append("typeDocument", data.typeDocument);

		await uploadDocument(formData);
	};

	return (
		<div className="flex items-center justify-center p-12">
			<div className="mx-auto w-full max-w-[550px] bg-white">
				<form onSubmit={handleSubmit(onSubmit)} className="py-6 px-9">
					<CloseIcon />
					<div className="mb-6 pt-4">
						<div className="mb-8">
							<input
								type="file"
								id="file"
								className="sr-only"
								accept="application/pdf"
								{...register("document")}
							/>
							<label
								htmlFor="file"
								className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
							>
								<div>
									<span className="mb-2 block text-xl font-semibold text-[#07074D]">
										Arrastra y suelta
									</span>
									<span className="mb-2 block text-base font-medium text-[#6B7280]">
										O haz click para seleccionar
									</span>
									<button
										type="button"
										className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
									>
										Seleccionar archivo
									</button>
								</div>
							</label>
						</div>
					</div>
					<div>
						<button className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none">
							Subir archivo
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UploadFile;

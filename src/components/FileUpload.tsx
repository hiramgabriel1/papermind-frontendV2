import { useState } from "react";
import Image from "next/image";

interface FileUploadProps {
	file: File | null;
	setFile: (file: File | null) => void;
}

/**
 * Componente para subir un archivo
 * @param file - Archivo a subir
 * @param setFile - Función para establecer el archivo
 * @returns Componente para subir un archivo
 */
export default function FileUpload({ file, setFile }: FileUploadProps) {
	const [timeAgo, setTimeAgo] = useState<string>("");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setTimeAgo("Just now");
		}
	};

	const imagePreview = file ? URL.createObjectURL(file) : "";

	return (
		<section className="p-4">
			{!file ? (
				<div className="border-2 border-dashed border-black/30 rounded-2xl p-4 h-96 relative">
					<input
						type="file"
						accept="application/pdf"
						name="doc"
						onChange={handleFileChange}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						title="Upload file"
					/>
					<div className="h-full w-full flex flex-col items-center justify-center text-gray-500">
						<p>Suelta tu archivo aquí o haz click para buscar</p>
					</div>
				</div>
			) : (
				<div className="bg-white rounded-lg shadow p-4">
					<div className="flex items-start gap-3">
						<div className="bg-gray-100 p-2 flex items-center rounded-lg size-12">
							<Image
								src={imagePreview}
								alt=""
								className="w-full object-cover"
								width={100}
								height={100}
							/>
						</div>
						<div>
							<h3 className="font-medium text-gray-900">{file.name}</h3>
							<p className="text-sm text-gray-500">{timeAgo}</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { useCreateChat } from "@/hooks/useCreateChat";
import { useRouter } from "next/navigation";

/**
 * Componente de nueva conversación
 * @returns Componente de nueva conversación
 */
export default function NewChat() {
	const [isOpen, setIsOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const router = useRouter();
	const createChat = useCreateChat();

	const handleCreate = async () => {
		if (!file) return;

		try {
			const formData = new FormData();
			formData.append("document", file);

			const uploaded = await createChat(formData);

			setIsOpen(false);
			setFile(null);
			router.push(`/chat/${uploaded.chat.id}`);
		} catch (error) {
			console.error("Error al crear el chat:", error);
		}
	};

	return (
		<>
			<button
				className="bg-neutral-950 text-white font-semibold rounded-2xl px-6 py-2 cursor-pointer"
				onClick={() => setIsOpen(true)}
			>
				Nueva conversación
			</button>

			{isOpen && (
				<section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<section className="bg-white rounded-lg max-w-6xl w-full">
						<div className="flex justify-between items-center border-b border-black/30 p-4">
							<h2 className="text-xl font-semibold mb-4">Documentos</h2>
							<input
								type="text"
								placeholder="Buscar documento"
								className="border border-black/30 rounded-2xl px-4 py-2"
							/>
						</div>

						<section className="p-2">
							<FileUpload file={file} setFile={setFile} />
						</section>

						<div className="flex justify-end p-4 items-center border-t border-black/30">
							<button
								className="font-semibold border border-black/30 rounded-2xl px-4 py-2 cursor-pointer"
								onClick={() => setIsOpen(false)}
							>
								Cancelar
							</button>
							<button
								disabled={!file}
								onClick={handleCreate}
								className="bg-neutral-950 text-white font-semibold rounded-2xl px-4 py-2 ml-4 cursor-pointer disabled:opacity-20"
							>
								Crear
							</button>
						</div>
					</section>
				</section>
			)}
		</>
	);
}

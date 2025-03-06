"use client";

import React, { useEffect, useState } from "react";
import Preview from "./Preview";
import { useFindFile } from "@/hooks/useFindFile";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryChat } from "@/hooks/useQueryChat";

/**
 * Componente de chat
 * @returns Componente de chat
 */

interface ChatProps {
	chatId: number | string;
}

type InputsChat = {
	queryMessage: string;
};

/**
 * Componente de chat
 * @param chatId - ID del chat
 * @returns Componente de chat
 */
export default function Chat({ chatId }: ChatProps) {
	const [documentUrl, setDocumentUrl] = useState<string | null>(null);
	const findFile = useFindFile(Number(chatId));

	const { register, handleSubmit } = useForm<InputsChat>();
	const onSubmit: SubmitHandler<InputsChat> = async (data) =>
		await useQueryChat(data.queryMessage, String(chatId));

	useEffect(() => {
		findFile.then((res) => {
			setDocumentUrl(res.chat.fileUrl);
		});
	}, [findFile]);

	return (
		<main>
			<section>
				<div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 text-start">
					<div>
						<div className="py-4 space-y-4 flex flex-col">
							<p>
								¡Hola! Soy tu asistente de documentos multilingüe, aquí para
								ayudarte a responder preguntas sobre los documentos que has
								subido.
							</p>
							<p>Puedo ayudarte con:</p>
							<ul className="list-disc pl-6">
								<li>
									<span>Resumir la informacion del documento</span>
								</li>
								<li>
									<span>
										Crear una version diferente en base a tu documento
									</span>
								</li>
								<li>
									<span>Generar mas ideas para tu documento</span>
								</li>
								<li>
									<span>Buscar informacion especifica</span>
								</li>
							</ul>
						</div>
						<div id="chat-input sticky top-0 bg-white z-10 p-4">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex space-x-4 bg-white border border-gray-300 rounded-lg p-3"
							>
								<button className="text-base text-gray-400">+</button>
								<textarea
									className="w-full text-sm p-2 resize-none focus:outline-none"
									rows={1}
									required
									placeholder="Escribe algo..."
									{...register("queryMessage")}
								/>
								<button className="px-4 py-2 text-sm">Enviar</button>
							</form>
						</div>
					</div>
					<div>
						<Preview pdfUrl={String(documentUrl)} />
					</div>
				</div>
			</section>
		</main>
	);
}

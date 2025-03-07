"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Preview from "./Preview";
import { useFindFile } from "@/hooks/useFindFile";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryChat } from "@/hooks/useQueryChat";
import FirstMessage from "./FirstMessage";
import { getDataChat } from "@/hooks/useGetDataChat";

interface ChatProps {
	chatId: number | string;
}

type InputsChat = {
	queryMessage: string;
};

type Message = {
	user: string;
	systemAnswer: string;
};

/**
 * Chat
 * @param chatId - ID del chat
 * @returns Chat
 */
export default function Chat({ chatId }: ChatProps) {
	const [documentUrl, setDocumentUrl] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [historyChat, setHistoryChat] = useState<Message[]>([]);

	const findFile = useFindFile(Number(chatId));
	const { register, handleSubmit, reset } = useForm<InputsChat>();

	const onSubmit: SubmitHandler<InputsChat> = async (data) => {
		const response = await useQueryChat(data.queryMessage, String(chatId));
		if (response && response.messages) {
			setMessages(response.messages);
		}
		reset();
	};

	useEffect(() => {
		findFile.then((res) => {
			if (res?.chat?.fileUrl) {
				setDocumentUrl(res.chat.fileUrl);
			}
		});
	}, [findFile]);

	useEffect(() => {
		(async () => {
			const data = await getDataChat(String(chatId));
			if (data?.chat?.contextChat) {
				setHistoryChat(data.chat.contextChat);
			}
		})();
	}, [chatId]);

	const combinedMessages = [...historyChat, ...messages];

	return (
		<main className="p-4">
			<section className="h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-4 text-start">
				<div className="flex flex-col h-full overflow-hidden">
					<div className="flex-1 border p-4 rounded-lg overflow-y-auto flex flex-col gap-4">
						{combinedMessages.length > 0 ? (
							combinedMessages.map((msg, index) => (
								<div key={index}>
									<div className="flex items-start gap-2 mb-2">
										<Image
											src="https://i.pinimg.com/564x/9d/6b/9d/9d6b9db2dcb0526a09b89fb35d075c72.jpg"
											alt="avatar"
											className="rounded-full"
											width={40}
											height={40}
										/>
										<div className="bg-blue-100 p-2 rounded-lg">
											<p className="text-gray-800">{msg.user}</p>
										</div>
									</div>
									<div className="flex justify-end mb-2">
										<div className="bg-green-100 p-2 rounded-lg max-w-[80%]">
											<p className="text-gray-800">{msg.systemAnswer}</p>
										</div>
									</div>
								</div>
							))
						) : (
							<FirstMessage />
						)}
					</div>
					<div className="bg-white p-4 border border-gray-300 rounded-lg mt-4">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex space-x-4 items-center"
						>
							<button type="button" className="text-base text-gray-400">
								+
							</button>
							<textarea
								className="w-full text-sm p-2 resize-none focus:outline-none"
								rows={1}
								required
								placeholder="Escribe algo..."
								{...register("queryMessage")}
							/>
							<button type="submit" className="px-4 py-2 text-sm bg-gray-200">
								Enviar
							</button>
						</form>
					</div>
				</div>
				<div className="h-full border rounded-lg overflow-hidden">
					<Preview pdfUrl={String(documentUrl)} />
				</div>
			</section>
		</main>
	);
}

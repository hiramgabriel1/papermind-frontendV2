"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Preview from "./Preview";
import { useFindFile } from "@/hooks/useFindFile";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryChat } from "@/hooks/useQueryChat";
import FirstMessage from "./FirstMessage";
import { getDataChat } from "@/hooks/useGetDataChat";
import Loading from "./Loading";
import { PlusIcon } from "../Icons";

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
	const [loading, setLoading] = useState<boolean>(false);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const findFile = useFindFile(Number(chatId));
	const { register, handleSubmit, reset } = useForm<InputsChat>();

	const onSubmit: SubmitHandler<InputsChat> = async (data) => {
		setLoading(true);
		const response = await useQueryChat(data.queryMessage, String(chatId));
		if (response && response.messages) {
			setMessages(response.messages);
		}
		setLoading(false);
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

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [combinedMessages]);

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
										<div className="bg-white p-2 rounded-lg max-w-[80%]">
											<p className="text-white-800">{msg.systemAnswer}</p>
										</div>
									</div>
								</div>
							))
						) : (
							<FirstMessage />
						)}
						{loading && (
							<div className="flex justify-center mt-4">
								<Loading />
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
					<div className="bg-white p-4 border border-gray-300 rounded-lg mt-4">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex space-x-4 items-center"
						>
							<div className="relative">
								<button
									type="button"
									className="text-base text-gray-400"
									onClick={() => setShowDropdown((prev) => !prev)}
								>
									<PlusIcon />
								</button>
								{showDropdown && (
									<div className="absolute left-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10 p-2">
										<ul className="space-y-2">
											<li>
												<button
													className="w-full text-left text-sm px-2 py-1 hover:bg-gray-100 rounded"
													onClick={() => console.log("Opción 1")}
												>
													Crear un nuevo archivo
												</button>
											</li>
											<li>
												<button
													className="w-full text-left text-sm px-2 py-1 hover:bg-gray-100 rounded"
													onClick={() => console.log("Opción 2")}
												>
													Compartir chat
												</button>
											</li>
										</ul>
									</div>
								)}
							</div>
							<textarea
								className="w-full text-sm p-2 resize-none focus:outline-none"
								rows={1}
								required
								placeholder="Escribe algo..."
								{...register("queryMessage")}
							/>
							<button
								type="submit"
								disabled={loading}
								className={`px-4 py-2 text-sm bg-black text-white rounded-md ${
									loading ? "opacity-50 cursor-not-allowed" : ""
								}`}
							>
								{loading ? "Pensando..." : "Preguntar"}
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

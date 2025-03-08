"use client";
import React from "react";
import { useDeleteChat } from "@/hooks/useDeleteChat";
import { toast, ToastContainer } from "react-toastify";

type Props = {
	chatId: string;
	onChatDeleted: () => void;
	onEditName: () => void;
};

export default function Dropdown({ chatId, onChatDeleted, onEditName }: Props) {
	const deleteChat = useDeleteChat();

	async function handleDelete() {
		try {
			await deleteChat(chatId);
			onChatDeleted();
		} catch (err) {
			toast.error(`Error al eliminar el chat: ${err}`);
		}
	}

	return (
		<div className="relative z-10">
			<ToastContainer />
			<div
				className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md
                   border border-gray-100 bg-white shadow-lg"
			>
				<div className="p-2">
					<strong className="p-2 text-xs font-medium uppercase text-gray-400">
						General
					</strong>
					<button
						className="block w-full text-left rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
						onClick={onEditName}
					>
						Editar nombre
					</button>
				</div>
				<div className="p-2">
					<strong className="block p-2 text-xs font-medium uppercase text-gray-400">
						Otras
					</strong>
					<button
						className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm
                       text-red-700 hover:bg-red-50"
						onClick={handleDelete}
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}

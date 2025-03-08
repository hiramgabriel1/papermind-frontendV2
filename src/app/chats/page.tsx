"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { useFindChats } from "@/hooks/useFindChats";
import { useRouter } from "next/navigation";
import { Chat } from "@/types/user.interfaces";
import { toast, ToastContainer } from "react-toastify";
import { OptionsIcon } from "@/components/Icons";
import Dropdown from "@/components/Dropdown";
import UpdateChatname from "./UpdateChatname";

moment.locale("es");

export default function Page() {
	const [chats, setChats] = useState<Chat[]>([]);
	const [todayChats, setTodayChats] = useState<Chat[]>([]);
	const [past30DaysChats, setPast30DaysChats] = useState<Chat[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeChatId, setActiveChatId] = useState<number | null>(null);

	const [editChatId, setEditChatId] = useState<number | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);

	const router = useRouter();

	const isToday = (date: Date) => {
		const now = new Date();
		return (
			date.getDate() === now.getDate() &&
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear()
		);
	};

	const isWithin30Days = (date: Date) => {
		const now = new Date().getTime();
		const difference = now - date.getTime();
		return difference <= 30 * 24 * 60 * 60 * 1000;
	};

	useEffect(() => {
		(async () => {
			try {
				const data = await useFindChats();
				if (data?.chats) {
					const sorted = data.chats.sort(
						(a: Chat, b: Chat) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
					const today = sorted.filter((c: Chat) =>
						isToday(new Date(c.createdAt))
					);
					const past30 = sorted.filter((c: Chat) => {
						const d = new Date(c.createdAt);
						return !isToday(d) && isWithin30Days(d);
					});
					setChats(sorted);
					setTodayChats(today);
					setPast30DaysChats(past30);
				}
			} catch (err) {
				toast.error(`Hubo un error al obtener los chats: ${err}`);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	function toggleDropdown(e: React.MouseEvent, chatId: number) {
		e.stopPropagation();
		setActiveChatId((prev) => (prev === chatId ? null : chatId));
	}

	function handleChatDeleted(id: number) {
		toast.success("Chat eliminado correctamente");
		setChats((prev) => prev.filter((x) => x.id !== id));
		setTodayChats((prev) => prev.filter((x) => x.id !== id));
		setPast30DaysChats((prev) => prev.filter((x) => x.id !== id));
	}

	function openEditModal(id: number) {
		setActiveChatId(null);
		setEditChatId(id);
		setShowEditModal(true);
	}

	function handleChatUpdated(id: number, newName: string) {
		setChats((prev) =>
			prev.map((c) => (c.id === id ? { ...c, title: newName } : c))
		);
		setTodayChats((prev) =>
			prev.map((c) => (c.id === id ? { ...c, title: newName } : c))
		);
		setPast30DaysChats((prev) =>
			prev.map((c) => (c.id === id ? { ...c, title: newName } : c))
		);
	}

	if (loading) return <div>Cargando...</div>;

	return (
		<div className="p-4 w-full">
			<ToastContainer />
			<h1 className="text-2xl font-bold mb-2">Conversaciones</h1>
			<p className="text-gray-600 mb-6">
				Chatea con documentos como pdf, docx y docs
			</p>

			<div className="flex items-center justify-between mb-4">
				<div className="relative w-1/2">
					<input
						type="text"
						placeholder="Buscar..."
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
					/>
				</div>
				<button className="px-4 py-2 bg-black text-white rounded-md">
					Nuevo chat
				</button>
			</div>

			<div className="overflow-y-auto max-h-[500px] space-y-6 pr-2">
				{todayChats.length > 0 && (
					<div>
						<h2 className="text-2xl font-bold mb-2">Hoy</h2>
						<div className="space-y-2">
							{todayChats.map((chat) => (
								<div
									key={chat.id}
									className="relative flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition cursor-pointer"
									onClick={() => router.push(`/chat/${chat.id}`)}
								>
									<div className="flex flex-col">
										<span className="font-medium text-gray-900">
											{chat.title}
										</span>
										<span className="text-sm text-gray-500">
											{moment(chat.createdAt).format("M/D/YYYY, h:mm A")}
										</span>
									</div>
									<button
										onClick={(e) => toggleDropdown(e, chat.id)}
										className="text-gray-500 hover:text-gray-700 ml-2"
									>
										<OptionsIcon />
									</button>
									{activeChatId === chat.id && (
										<div
											className="absolute right-0 top-12 w-48 bg-white border border-gray-200 shadow-md rounded-md z-10"
											onClick={(e) => e.stopPropagation()}
										>
											<Dropdown
												chatId={String(chat.id)}
												onChatDeleted={() => handleChatDeleted(chat.id)}
												onEditName={() => openEditModal(chat.id)}
											/>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{past30DaysChats.length > 0 && (
					<div>
						<h2 className="text-2xl font-bold mb-2">Últimos 30 días</h2>
						<div className="space-y-2">
							{past30DaysChats.map((chat) => (
								<div
									key={chat.id}
									className="relative flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition cursor-pointer"
									onClick={() => router.push(`/chat/${chat.id}`)}
								>
									<div className="flex flex-col">
										<span className="font-medium text-gray-900">
											{chat.title}
										</span>
										<span className="text-sm text-gray-500">
											{moment(chat.createdAt).format("M/D/YYYY, h:mm A")}
										</span>
									</div>
									<button
										onClick={(e) => toggleDropdown(e, chat.id)}
										className="text-gray-500 hover:text-gray-700 ml-2"
									>
										<OptionsIcon />
									</button>
									{activeChatId === chat.id && (
										<div
											className="absolute right-0 top-12 w-48 bg-white border border-gray-200 shadow-md rounded-md z-10"
											onClick={(e) => e.stopPropagation()}
										>
											<Dropdown
												chatId={String(chat.id)}
												onChatDeleted={() => handleChatDeleted(chat.id)}
												onEditName={() => openEditModal(chat.id)}
											/>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{showEditModal && editChatId && (
				<UpdateChatname
					chatId={editChatId}
					onClose={() => setShowEditModal(false)}
					onUpdated={(newName) => {
						handleChatUpdated(editChatId, newName);
						setShowEditModal(false);
					}}
				/>
			)}
		</div>
	);
}

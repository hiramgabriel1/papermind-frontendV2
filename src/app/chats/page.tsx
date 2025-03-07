"use client";

import React, { useEffect, useState } from "react";
import { useFindChats } from "@/hooks/useFindChats";
import { useRouter } from "next/navigation";
import { Chat } from "@/types/user.interfaces";

function Page() {
	const [_chats, setChats] = useState<[]>([]);
	const [todayChats, setTodayChats] = useState<[]>([]);
	const [past30DaysChats, setPast30DaysChats] = useState<[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

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
		const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
		return difference <= thirtyDaysInMs;
	};

	useEffect(() => {
		(async () => {
			try {
				const data = await useFindChats();
				if (data && data.chats) {
					const sortedChats = data.chats.sort((a: Chat, b: Chat) => {
						return (
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						);
					});

					const today = sortedChats.filter((chat: Chat) =>
						isToday(new Date(chat.createdAt))
					);
					const past30Days = sortedChats.filter((chat: Chat) => {
						const chatDate = new Date(chat.createdAt);
						return !isToday(chatDate) && isWithin30Days(chatDate);
					});

					setChats(sortedChats);
					setTodayChats(today);
					setPast30DaysChats(past30Days);
				}
			} catch (err) {
				console.error(err);
				setError("Hubo un error al obtener los chats.");
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <div>Cargando...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="p-4 max-w-4xl">
			<h1 className="text-2xl font-bold mb-2">Conversaciones</h1>
			<p className="text-gray-600 mb-6">
				Chattea con documentos como pdf, docx y docs
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
							{todayChats.map((chat: Chat) => (
								<div
									key={chat.id}
									className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition cursor-pointer"
									onClick={() => router.push(`/chat/${chat.id}`)}
								>
									<div className="flex flex-col">
										<span className="font-medium text-gray-900">
											{chat.title}
										</span>
										<span className="text-sm text-gray-500">
											{new Date(chat.createdAt).toLocaleString()}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{past30DaysChats.length > 0 && (
					<div>
						<h2 className="text-2xl font-bold mb-2">Últimos 30 días</h2>
						<div className="space-y-2">
							{past30DaysChats.map((chat: Chat) => (
								<div
									key={chat.id}
									className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition cursor-pointer"
									onClick={() => router.push(`/chat/${chat.id}`)}
								>
									<div className="flex flex-col">
										<span className="font-medium text-gray-900">
											{chat.title}
										</span>
										<span className="text-sm text-gray-500">
											{new Date(chat.createdAt).toLocaleString()}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Page;

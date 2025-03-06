"use client";

import React from "react";
import { useParams } from "next/navigation";
import Chat from "@/components/chats/Chat";

/**
 * Página de chat
 * @returns Página de chat
 */
export default function ChatPage() {
	const { chatId } = useParams();

	return <Chat chatId={chatId as string} />;
}

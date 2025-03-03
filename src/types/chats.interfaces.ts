import { File } from "buffer";

export interface CreateChatResponse {
	message: string;
	chat: {
		id: number;
		title: string;
		description: string;
		fileUrl: string;
		contextChat: null;
		contextDoc: string;
		userId: number;
		createdAt: string;
		updatedAt: string;
	};
}

export interface IChat {
	title?: string;
	description?: string;
	fileUrl: File | string;
}

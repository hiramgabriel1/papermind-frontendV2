export interface User {
	email: string;
	password: string;
}

export interface UserResponse {
	userId: number;
	profilePic: string | null;
	username: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	createdAt: string;
	updatedAt: string;
	token: string;
	chats: Chat[];
}

export interface Chat {
	id: number;
	title: string;
	createdAt: string;
}

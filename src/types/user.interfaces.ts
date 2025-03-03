export interface User {
	email: string;
	password: string;
}

export interface UserResponse {
	user: {
		id: number;
		profilePic: string | null;
		username: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		password: string;
		createdAt: string;
		updatedAt: string;
	};
	token: string;
}

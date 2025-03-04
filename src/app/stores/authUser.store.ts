import { create } from "zustand";

interface AuthState {
	token: string | null;
	setToken: (token: string | null) => void;
}

/**
 * This store is used to store the user's token
 * @returns
 * @description This store is used to store the user's token
 * @param token - The user's token
 * @param setToken - The function to set the user's token
 */
export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	setToken: (token) => set({ token }),
}));

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateChatname } from "@/hooks/useUpdateChatname";

type Props = {
	chatId: number;
	onClose: () => void;
	onUpdated: (newName: string) => void;
};

type FormData = {
	newName: string;
};

export default function UpdateChatname({ chatId, onClose, onUpdated }: Props) {
	const { register, handleSubmit } = useForm<FormData>();
	const updateChatname = useUpdateChatname();

	async function onSubmit(data: FormData) {
		console.log(data.newName);
		console.log(data);
		try {
			const res = await updateChatname(String(chatId), data.newName);
			if (res) {
				toast.success("Nombre actualizado");
				onUpdated(data.newName);
			}
		} catch (err) {
			toast.error(`Error al actualizar el nombre: ${err}`);
		} finally {
			onClose();
		}
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Editar nombre</h3>
					<button className="text-gray-600 p-2" onClick={onClose}>
						✖
					</button>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Nuevo nombre"
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
						{...register("newName", { required: true })}
					/>
					<button className="bg-black text-white p-2 rounded-lg w-full hover:bg-gray-800 transition">
						Actualizar
					</button>
				</form>
			</div>
		</div>
	);
}

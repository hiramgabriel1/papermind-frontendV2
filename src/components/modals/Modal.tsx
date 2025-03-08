import React from "react";

/**
 * Modal component
 * @returns Modal component
 */

interface ModalProps {
	isDeleteChat?: boolean;
}

function Modal({ isDeleteChat }: ModalProps) {
	return (
		<div className="rounded-lg bg-white p-8 shadow-2xl">
			<h2 className="text-lg font-bold">
				{isDeleteChat
					? "¿Estás seguro de querer eliminar este chat?"
					: "¿Estás seguro de querer eliminar este documento?"}
			</h2>

			<p className="mt-2 text-sm text-gray-500">
				{isDeleteChat
					? "Ya no podrás acceder a este chat, ¿estás seguro de querer hacerlo?"
					: "Ya no podrás acceder a este documento, ¿estás seguro de querer hacerlo?"}
			</p>

			<div className="mt-4 flex gap-2">
				<button
					type="button"
					className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
				>
					Si, estoy seguro
				</button>

				<button
					type="button"
					className="rounded-sm bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
				>
					No, volver
				</button>
			</div>
		</div>
	);
}

export default Modal;

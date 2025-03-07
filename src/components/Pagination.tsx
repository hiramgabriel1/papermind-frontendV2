import React from "react";

interface PaginationProps {
	currentPage: number;
	total: number;
	limit: number;
	onPageChange: (page: number) => void;
}

/**
 * Componente de paginación
 * @param currentPage - Página actual
 * @param total - Total de documentos
 * @param limit - Límite de documentos por página
 * @param onPageChange - Función para cambiar de página
 * @returns Componente de paginación
 */
export default function Pagination({
	currentPage,
	total,
	limit,
	onPageChange,
}: PaginationProps) {
	const totalPages = Math.ceil(total / limit);

	const handlePrev = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<button
				onClick={handlePrev}
				disabled={currentPage === 1}
				className="px-3 py-2 border border-gray-500 rounded-lg"
			>
				Anterior
			</button>
			<p className="text-sm text-gray-700">
				Mostrando página {currentPage} de {totalPages}
			</p>
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="px-3 py-2 border border-gray-500 rounded-lg bg-black text-white"
			>
				Siguiente
			</button>
		</div>
	);
}

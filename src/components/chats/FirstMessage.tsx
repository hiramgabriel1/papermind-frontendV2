import React from "react";

/**
 * First message component
 * @returns The First message component
 */
export default function FirstMessage() {
	return (
		<div className="py-4 space-y-4 flex flex-col">
			<p>
				¡Hola! Soy tu asistente de documentos{" "}
				<span className="font-bold">PaperMind</span>, estoy aquí para ayudarte a
				responder preguntas sobre los documentos que has subido.
			</p>
			<p>Puedo ayudarte con:</p>
			<ul className="list-disc pl-6">
				<li>Resumir la información del documento</li>
				<li>Crear una versión diferente en base a tu documento</li>
				<li>Generar más ideas para tu documento</li>
				<li>Buscar información específica sobre el documento</li>
			</ul>
		</div>
	);
}

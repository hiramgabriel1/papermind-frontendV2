import NewChat from "@/components/NewChat";

export default function Home() {
	return (
		<>
			<header>
				<h2 className="text-3xl font-semibold">Conversaciones</h2>
				<p className="text-neutral-500">
					Chat con documentos como pdf, docx, y docs.
				</p>
			</header>
			<section className="flex flex-col justify-center items-center h-full gap-4">
				<div className="text-neutral-500 text-lg">
					No hay conversaciones recientes.
				</div>
				<NewChat />
			</section>
		</>
	);
}

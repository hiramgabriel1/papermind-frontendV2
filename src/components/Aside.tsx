import NavLink from "./NavLink";
import NavUser from "./NavUser";

const data = [
	{
		href: "/",
		label: "Conversaciones",
	},
	{
		href: "/chats",
		label: "Chats",
	},
	{
		href: "/documents",
		label: "Documentos",
	},
	// {
	// 	href: "/podcast",
	// 	label: "Podcast",
	// },
	// {
	// 	href: "/other_tools",
	// 	label: "Other Tools",
	// },
	{
		href: "/help_&_support",
		label: "Ayuda y soporte",
	},
];

export default function Aside() {
	return (
		<aside className="bg-[#f7f6f6] py-8 px-6 w-80 h-screen flex flex-col gap-4">
			<h2 className="font-semibold text-3xl flex items-center gap-4 px-2.5">
				Papermind
				<span className="text-sm bg-green-100 text-green-600 px-1.5 py-0.5 rounded-lg">
					Beta
				</span>
			</h2>
			<nav>
				{data.map((item, index) => (
					<NavLink key={index} href={item.href}>
						{item.label}
					</NavLink>
				))}
			</nav>
			<footer className="flex flex-col gap-16 mt-auto">
				{/* <section className="bg-[#e3e9ff] p-4 rounded-lg">
					<h3 className="text-lg font-semibold">Try Pro</h3>
					<p className="text-gray-500">
						Upgrade for more powerful models, unlimited document uploads and
						access to summarisation.
					</p>
					<button className="bg-neutral-950 text-white rounded-2xl px-5 py-2 mt-4">
						Start Free Trial
					</button>
				</section> */}
				<NavUser />
			</footer>
		</aside>
	);
}

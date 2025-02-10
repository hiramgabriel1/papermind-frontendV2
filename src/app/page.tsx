export default function Home() {
  return (
    <>
      <header>
        <h2 className="text-3xl font-semibold">
          Conversations
        </h2>
        <p className="text-neutral-500">
          Chat with documents like pdf, docx, and docs.
        </p>
      </header>
      <section className="flex flex-col justify-center items-center h-full gap-4">
        <div className="text-neutral-500 text-lg">
          No recent conversations yet.
        </div>
        <button className="bg-neutral-950 text-white font-semibold rounded-2xl px-6 py-2">
          New Chat
        </button>
      </section>
    </>
  );
}

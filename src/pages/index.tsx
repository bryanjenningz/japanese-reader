import { PasteContentGoIcon } from "~/icons/PasteContentGoIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <header className="flex h-12 w-full items-center justify-center">
        <div className="flex h-full w-full max-w-2xl items-center justify-between">
          <h1 className="px-4 text-lg font-bold">Japanese Reader</h1>
          <button
            className="flex h-12 w-12 items-center justify-center"
            title="Paste Japanese text"
          >
            <PasteContentGoIcon />
          </button>
        </div>
      </header>
    </main>
  );
}

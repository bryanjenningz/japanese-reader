import Link from "next/link";
import { HistoryIcon } from "~/icons/HistoryIcon";
import { PasteContentGoIcon } from "~/icons/PasteContentGoIcon";
import { useHistoryAction, useHistoryState } from "~/stores/historyStore";

export default function Home() {
  const selectedEntry = useHistoryState((x) => x.selectedEntry);
  const addEntry = useHistoryAction((x) => x.addEntry);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <header className="fixed left-0 right-0 top-0 flex h-12 w-full items-center justify-center bg-inherit">
        <div className="flex h-full w-full max-w-2xl items-center justify-between">
          <h1 className="px-4 text-lg font-bold">Japanese Reader</h1>

          <div className="flex">
            <button
              className="flex h-12 w-12 items-center justify-center"
              title="Paste Japanese text"
              onClick={() => {
                void (async () => {
                  try {
                    addEntry({
                      text: await navigator.clipboard.readText(),
                      time: Date.now(),
                    });
                  } catch {
                    const text = prompt("Paste Japanese text");
                    if (text === null) {
                      return;
                    }
                    addEntry({ text, time: Date.now() });
                  }
                })();
              }}
            >
              <PasteContentGoIcon />
            </button>

            <Link
              className="flex h-12 w-12 items-center justify-center"
              title="See history"
              href="/history"
            >
              <HistoryIcon />
            </Link>
          </div>
        </div>
      </header>

      <p className="w-full max-w-2xl px-4 pb-60 pt-14 text-xl">
        {selectedEntry?.text.split("").map((char, i) => {
          return <span key={`${char}-${i}`}>{char}</span>;
        })}
      </p>
    </main>
  );
}

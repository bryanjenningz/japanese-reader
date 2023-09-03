import Link from "next/link";
import { useRef, useState } from "react";
import { SelectableReadingText } from "~/components/SelectableReadingText";
import { WordEntryList } from "~/components/WordEntryList";
import { type WordSearchResult } from "~/dictionary/search";
import { useSearch } from "~/dictionary/useSearch";
import { HistoryIcon } from "~/icons/HistoryIcon";
import { PasteContentGoIcon } from "~/icons/PasteContentGoIcon";
import { useHistoryAction, useHistoryState } from "~/stores/historyStore";

const MAX_WORD_SIZE = 20;

export default function Home() {
  const selectedEntry = useHistoryState((x) => x.selectedEntry);
  const addEntry = useHistoryAction((x) => x.addEntry);
  const { selectedText, wordEntries, selectedTextIndex, setSelectedTextIndex } =
    useSelectedText(selectedEntry?.text ?? "");
  const selectedTextElement = useRef<HTMLElement | null>(null);
  const selectedTextElementBottom = selectedTextElement.current
    ? selectedTextElement.current.getBoundingClientRect().bottom +
      window.scrollY
    : undefined;

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

      <div className="flex w-full max-w-2xl flex-col">
        <SelectableReadingText
          readingText={selectedEntry?.text ?? ""}
          selectedTextIndex={selectedTextIndex}
          selectedTextElement={selectedTextElement}
          setSelectedTextIndex={setSelectedTextIndex}
          selectedTextLength={selectedText.length}
        />

        <WordEntryList
          selectedTextElementBottom={selectedTextElementBottom}
          wordEntries={wordEntries}
        />
      </div>
    </main>
  );
}

function useSelectedText(readingText: string) {
  const [selectedTextIndex, setSelectedTextIndex] = useState<null | number>(
    null,
  );
  const search = useSearch();
  const { selectedTextLength, wordEntries } = ((): WordSearchResult => {
    if (selectedTextIndex === null) {
      return { selectedTextLength: 1, wordEntries: [] };
    }
    const text = readingText
      .slice(selectedTextIndex, selectedTextIndex + MAX_WORD_SIZE)
      .trim();
    return search(text);
  })();
  const selectedText =
    typeof selectedTextIndex === "number"
      ? readingText.slice(
          selectedTextIndex,
          selectedTextIndex + selectedTextLength,
        )
      : "";
  return {
    selectedText,
    wordEntries,
    selectedTextIndex,
    setSelectedTextIndex,
  };
}

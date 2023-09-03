import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert } from "~/components/Alert";
import { ContextMenu } from "~/components/ContextMenu";
import { ArrowBackIcon } from "~/icons/ArrowBackIcon";
import { useHistoryAction, useHistoryState } from "~/stores/historyStore";

export default function History() {
  const router = useRouter();
  const entries = useHistoryState((x) => x.entries);
  const selectEntry = useHistoryAction((x) => x.selectEntry);
  const removeEntry = useHistoryAction((x) => x.removeEntry);
  const clearAll = useHistoryAction((x) => x.clearAll);
  const [showClearAllAlert, setShowClearAllAlert] = useState(false);
  const [contextMenuIndex, setContextMenuIndex] = useState(-1);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <header className="fixed left-0 right-0 top-0 flex h-12 w-full items-center justify-center bg-inherit">
        <div className="flex h-full w-full max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center"
            title="Go back"
          >
            <ArrowBackIcon />
          </Link>

          <h1 className="grow px-4 text-lg font-bold">History</h1>

          <button
            className="flex h-12 w-fit items-center justify-center px-2 text-sm  uppercase"
            onClick={() => setShowClearAllAlert(true)}
          >
            Clear all
          </button>
        </div>
      </header>

      {showClearAllAlert && (
        <Alert onClickOverlay={() => setShowClearAllAlert(false)}>
          <div className="flex flex-col gap-3 bg-slate-700 p-5">
            <h2 className="text-xl font-bold">Clear History</h2>

            <p>Are you sure you want to clear all Japanese text history?</p>

            <div className="flex justify-end gap-3">
              <button
                className="p-2 text-sm font-bold uppercase text-blue-500"
                onClick={() => setShowClearAllAlert(false)}
              >
                No
              </button>
              <button
                className="p-2 text-sm font-bold uppercase text-blue-500"
                onClick={() => {
                  clearAll();
                  setShowClearAllAlert(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Alert>
      )}

      <div className="w-full max-w-2xl">
        <section className="flex flex-col pt-14">
          {entries?.map((entry, index) => {
            return (
              <button
                key={entry.time}
                className="relative flex select-none flex-col gap-1 border-b border-slate-700 px-4 py-2 last:border-b-0"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    selectEntry(entry);
                    void router.push("/");
                  }
                }}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setContextMenuIndex(index);
                }}
              >
                <h2 className="text-sm font-bold text-blue-500">
                  {formatTime(entry.time)}
                </h2>
                <p className="line-clamp-4 text-sm">{entry.text}</p>

                {contextMenuIndex === index && (
                  <ContextMenu onClickOut={() => setContextMenuIndex(-1)}>
                    <button
                      className="w-full bg-slate-700 py-2"
                      onClick={() => {
                        setContextMenuIndex(-1);
                        removeEntry(entry);
                      }}
                    >
                      Delete
                    </button>
                  </ContextMenu>
                )}
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function formatTime(time: number): string {
  const date = new Date(time);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString(undefined, {
      timeStyle: "short",
      hourCycle: "h12",
    })
  );
}

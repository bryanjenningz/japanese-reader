import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStore } from "~/stores/useStore";

type HistoryState = {
  selectedEntry: HistoryEntry | undefined;
  entries: HistoryEntry[];
};

type HistoryEntry = {
  text: string;
  time: number;
};

type HistoryActions = {
  selectEntry: (entry: HistoryEntry) => void;
  addEntry: (entry: HistoryEntry) => void;
  removeEntry: (entry: HistoryEntry) => void;
  clearAll: () => void;
};

type HistoryStore = HistoryState & HistoryActions;

const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      selectedEntry: undefined,
      entries: [],

      selectEntry: (entry: HistoryEntry) => {
        set({ selectedEntry: entry });
      },

      addEntry: (entry: HistoryEntry) => {
        set(({ selectedEntry, entries }) => ({
          selectedEntry: selectedEntry ?? entry,
          entries: [entry, ...entries],
        }));
      },

      removeEntry: (entry: HistoryEntry) => {
        set(({ selectedEntry, entries }) => {
          const equals = (entry1: HistoryEntry, entry2: HistoryEntry) =>
            entry1.text === entry2.text && entry1.time === entry2.time;

          const newEntries = entries.filter((e) => !equals(e, entry));

          return {
            selectedEntry:
              selectedEntry && equals(selectedEntry, entry)
                ? newEntries[0]
                : selectedEntry,

            entries: newEntries,
          };
        });
      },

      clearAll: () => {
        set({ selectedEntry: undefined, entries: [] });
      },
    }),
    { name: "history" },
  ),
);

export const useHistoryState = <T>(selector: (state: HistoryState) => T) =>
  useStore(useHistoryStore, selector);

export const useHistoryAction = <T>(selector: (actions: HistoryActions) => T) =>
  useHistoryStore(selector);

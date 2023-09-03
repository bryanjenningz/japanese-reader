import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStore } from "~/stores/useStore";

type HistoryState = {
  selectedEntry: HistoryEntry | undefined;
  history: HistoryEntry[];
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
      history: [],

      selectEntry: (entry: HistoryEntry) => {
        set({ selectedEntry: entry });
      },

      addEntry: (entry: HistoryEntry) => {
        set(({ history }) => ({ history: [entry, ...history] }));
      },

      removeEntry: (entry: HistoryEntry) => {
        set(({ selectedEntry, history }) => ({
          selectedEntry:
            selectedEntry?.text === entry.text &&
            selectedEntry?.time === entry.time
              ? undefined
              : selectedEntry,

          history: history.filter(
            (e) => e.text !== entry.text || e.time !== entry.time,
          ),
        }));
      },

      clearAll: () => {
        set({ history: [] });
      },
    }),
    { name: "history" },
  ),
);

export const useHistoryState = <T>(selector: (state: HistoryState) => T) =>
  useStore(useHistoryStore, selector);

export const useHistoryAction = <T>(selector: (actions: HistoryActions) => T) =>
  useHistoryStore(selector);

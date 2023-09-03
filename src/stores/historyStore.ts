import { create } from "zustand";
import { persist } from "zustand/middleware";

type HistoryState = {
  history: HistoryEntry[];
};

type HistoryEntry = {
  text: string;
  time: number;
};

type HistoryActions = {
  addEntry: (entry: HistoryEntry) => void;
  removeEntry: (entry: HistoryEntry) => void;
  clearAll: () => void;
};

type HistoryStore = HistoryState & HistoryActions;

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],

      addEntry: (entry: HistoryEntry) => {
        set(({ history }) => ({ history: [entry, ...history] }));
      },

      removeEntry: (entry: HistoryEntry) => {
        set(({ history }) => ({
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

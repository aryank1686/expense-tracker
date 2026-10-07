import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Date.now().toString(),
              date: transaction.date ?? formatDate(new Date()),
            },
            ...state.transactions,
          ],
        })),
    }),
    {
      name: "transactions",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

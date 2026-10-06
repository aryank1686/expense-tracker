import { create } from "zustand";

export const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const useTransactionStore = create((set) => ({
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
}));

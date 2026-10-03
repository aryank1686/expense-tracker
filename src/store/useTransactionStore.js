import { create } from "zustand";

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

export const useTransactionStore = create((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          ...transaction,
          id: Date.now().toString(),
          date: formatDate(new Date()),
        },
        ...state.transactions,
      ],
    })),
}));

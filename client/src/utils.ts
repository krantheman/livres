import { Transaction } from "./types";

export const calculateDebt = (transaction: Transaction) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const borrowDate = new Date(transaction.borrow_date);
  borrowDate.setHours(0, 0, 0, 0);
  const days = Math.round(
    Math.abs((today.getTime() - borrowDate.getTime()) / oneDay)
  );
  if (days <= 30) return 100;
  return Math.round(100 + ((days - 30) / 7) * 100);
};

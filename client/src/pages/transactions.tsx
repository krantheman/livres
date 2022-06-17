import { ChangeEvent, useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import TransactionListItem from "../components/TransactionListItem";
import { Transaction } from "../types";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleEditDialogOpen = () => {
    setEditDialogOpen(!editDialogOpen);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    fetch("/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
      });
  }, [editDialogOpen, deleteDialogOpen]);

  return (
    <PageLayout
      header="Library Transactions"
      handleSearch={handleSearch}
      searchLabel="Search for a member or a book"
    >
      {transactions
        .filter(
          (transaction) =>
            transaction.member.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            transaction.book.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            transaction={transaction}
            editOpen={editDialogOpen}
            handleEditOpen={handleEditDialogOpen}
            deleteOpen={deleteDialogOpen}
            handleDeleteOpen={handleDeleteDialogOpen}
          />
        ))}
    </PageLayout>
  );
};

export default Transactions;

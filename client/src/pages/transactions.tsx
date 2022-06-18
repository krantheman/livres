import { Box, Tabs, Tab, Typography } from "@mui/material";
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

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <PageLayout
      header="Library Transactions"
      handleSearch={handleSearch}
      searchLabel="Search for a member or a book"
    >
      <Box mb={4}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<Typography>Pending Transactions</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            label={<Typography> Completed Transactions </Typography>}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      {tab === 0 &&
        transactions
          .filter(
            (transaction) =>
              !transaction.return_date &&
              (transaction.member.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                transaction.book.title
                  .toLowerCase()
                  .includes(search.toLowerCase()))
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
      {tab === 1 &&
        transactions
          .filter(
            (transaction) =>
              transaction.return_date &&
              (transaction.member.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                transaction.book.title
                  .toLowerCase()
                  .includes(search.toLowerCase()))
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

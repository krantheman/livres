import { Box, Tabs, Tab, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import TransactionListItem from "../components/TransactionListItem";
import { Transaction } from "../types";
import Lottie from "lottie-react";
import noTransactionsAnimation from "../assets/no_transactions.json";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const [dummy, setDummy] = useState(true);
  const handleReRender = () => {
    setDummy(!dummy);
  };

  // Transactions
  const [pending, setPending] = useState<Transaction[]>([]);
  const [completed, setCompleted] = useState<Transaction[]>([]);
  useEffect(() => {
    fetch("/transactions")
      .then((res) => res.json())
      .then((data) => {
        setPending(
          data.transactions.filter(
            (transaction: Transaction) => !transaction.return_date
          )
        );
        setCompleted(
          data.transactions.filter(
            (transaction: Transaction) => transaction.return_date
          )
        );
      });
  }, [dummy]);

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
      {tab === 0 && pending.length === 0 ? (
        <Box mt={5}>
          <Lottie
            animationData={noTransactionsAnimation}
            style={{ height: 400 }}
          />
          <Typography variant="h5" align="center">
            You have no pending transactions.
          </Typography>
        </Box>
      ) : (
        tab === 0 &&
        pending
          .filter(
            (transaction) =>
              transaction.member.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              transaction.book.title
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
              handleReRender={handleReRender}
            />
          ))
      )}
      {tab === 1 &&
        completed
          .filter(
            (transaction) =>
              transaction.member.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              transaction.book.title
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
              handleReRender={handleReRender}
            />
          ))}
    </PageLayout>
  );
};

export default Transactions;

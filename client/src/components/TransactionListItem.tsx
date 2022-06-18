import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Transaction } from "../types";
import { calculateDebt } from "../utils";
import IsolatedMenu from "./IsolatedMenu";
import { TransactionDeleteDialog } from "./TransactionDeleteDialog";
import { TransactionEditDialog } from "./TransactionEditDialog";

type Props = {
  transaction: Transaction;
  handleReRender: () => void;
};

const TransactionListItem: FC<Props> = ({ transaction, handleReRender }) => {
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {
    setEditOpen(!editOpen);
    handleReRender();
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteOpen);
    handleReRender();
  };

  const snackbar = useSnackbar();

  const handleReceiveBook = () => {
    fetch(`/transaction/${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        borrow_date: transaction.borrow_date,
        return_date: new Date().toISOString(),
      }),
    })
      .then((res) =>
        res.json().then(() => {
          snackbar.makeSeverity("success");
          snackbar.makeMessage("Transaction set to completed!");
          snackbar.makeOpen(true);
          handleReRender();
        })
      )
      .catch((err) => {
        snackbar.makeMessage("Some error occurred while updating transaction.");
        snackbar.makeSeverity("error");
        snackbar.makeOpen(true);
        console.log(err);
      });
  };

  return (
    <Paper
      elevation={0}
      sx={{ mb: 4, p: 4, border: 1, borderColor: "lightgray" }}
    >
      <Stack direction="row">
        <Typography variant="h5" noWrap sx={{ width: "100%" }}>
          <b>{`Transaction No.: ${transaction.id}`}</b>
        </Typography>
        <IsolatedMenu
          handleEditOpen={handleEditOpen}
          handleDeleteOpen={handleDeleteOpen}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" noWrap mt={2}>
        <b>Member</b>
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Name: "}</b> {transaction.member.name}
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Email ID: "}</b> {transaction.member.email}
      </Typography>
      {!transaction.return_date && (
        <Typography sx={{ color: "gray" }} noWrap>
          <b>Amount due: </b> {`Rs. ${calculateDebt(transaction)}`}
        </Typography>
      )}
      <Typography variant="h6" noWrap mt={1}>
        <b>Book</b>
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Title: "}</b> {transaction.book.title}
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Author/s: "}</b> {transaction.book.authors}
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Borrowed on: "}</b>{" "}
        {transaction.borrow_date.toString().substring(0, 16)}
      </Typography>
      {transaction.return_date ? (
        <Typography sx={{ color: "gray" }} noWrap>
          <b>{"Returned on: "}</b>
          {transaction.return_date.toString().substring(0, 16)}
        </Typography>
      ) : (
        <Box mt={3}>
          <Button
            variant="outlined"
            endIcon={<DoneIcon />}
            onClick={handleReceiveBook}
          >
            Receive Book
          </Button>
        </Box>
      )}
      {editOpen && (
        <TransactionEditDialog
          open={editOpen}
          handleOpen={handleEditOpen}
          transaction={transaction}
        />
      )}
      {deleteOpen && (
        <TransactionDeleteDialog
          open={deleteOpen}
          handleOpen={handleDeleteOpen}
          transaction={transaction}
        />
      )}
    </Paper>
  );
};

export default TransactionListItem;

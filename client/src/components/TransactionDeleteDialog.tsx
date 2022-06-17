import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Transaction } from "../types";
import { calculateDebt } from "../utils";
import { Transition } from "./Transition";

type Props = {
  transaction: Transaction;
  open: boolean;
  handleOpen: () => void;
};

export const TransactionDeleteDialog: FC<Props> = ({
  transaction,
  open,
  handleOpen,
}) => {
  const snackbar = useSnackbar();

  const handleDelete = () => {
    fetch(`/transaction/${transaction.id}`, {
      method: "DELETE",
    })
      .then(() => {
        snackbar.makeMessage("Transaction deleted successfully");
        snackbar.makeOpen(true);
      })

      .catch((err) => {
        console.log(err);
        snackbar.makeMessage("Some error occurred while deleting.");
        snackbar.makeSeverity("error");
        snackbar.makeOpen(true);
      });
    handleOpen();
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle>
        <b>Delete Transaction?</b>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" noWrap mt={2}>
          <b>Member</b>
        </Typography>
        <Typography sx={{ color: "gray" }} noWrap>
          <b>{"Name: "}</b> {transaction.member.name}
        </Typography>
        <Typography sx={{ color: "gray" }} noWrap>
          <b>{"Email ID: "}</b> {transaction.member.email}
        </Typography>
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
        <Typography sx={{ color: "gray" }} noWrap>
          <b>{"Returned on: "}</b>
          {transaction.return_date
            ? transaction.return_date.toString().substring(0, 16)
            : "N/A"}
        </Typography>
        {!transaction.return_date && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">
              <b>Amount to be paid: </b> {`Rs. ${calculateDebt(transaction)}`}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button color="inherit" onClick={handleOpen} sx={{ mr: 2 }}>
          <b>Cancel</b>
        </Button>
        <Button
          variant="contained"
          color="error"
          disableElevation
          onClick={handleDelete}
        >
          <b>Delete</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

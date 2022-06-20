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
        snackbar.makeSeverity("error");
        snackbar.makeMessage("Some error occurred while deleting.");
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
        <Typography variant="h6" mt={2}>
          <b>Member</b>
        </Typography>
        <Typography sx={{ color: "gray" }}>
          <b>{"Name: "}</b> {transaction.member.name}
        </Typography>
        <Typography sx={{ color: "gray" }}>
          <b>{"Email ID: "}</b> {transaction.member.email}
        </Typography>
        <Typography variant="h6" mt={1}>
          <b>Book</b>
        </Typography>
        <Typography sx={{ color: "gray" }}>
          <b>{"Title: "}</b> {transaction.book.title}
        </Typography>
        <Typography sx={{ color: "gray" }}>
          <b>{"Author/s: "}</b> {transaction.book.authors}
        </Typography>
        <Typography sx={{ color: "gray" }}>
          <b>{"Borrowed on: "}</b>{" "}
          {transaction.borrow_date.toString().substring(0, 16)}
        </Typography>
        {transaction.return_date ? (
          <Typography sx={{ color: "gray" }}>
            <b>{"Returned on: "}</b>
            {transaction.return_date.toString().substring(0, 16)}
          </Typography>
        ) : (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">
              <b>Amount due: </b> {`Rs. ${calculateDebt(transaction)}`}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button
          size="large"
          color="inherit"
          onClick={handleOpen}
          sx={{ mr: 2 }}
        >
          <b>Cancel</b>
        </Button>
        <Button
          size="large"
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

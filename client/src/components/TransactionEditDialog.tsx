import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FC, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Transaction } from "../types";
import { Transition } from "./Transition";

type Props = {
  transaction: Transaction;
  open: boolean;
  handleOpen: () => void;
};

export const TransactionEditDialog: FC<Props> = ({
  transaction,
  open,
  handleOpen,
}) => {
  const [borrowDate, setBorrowDate] = useState<Date | null>(
    new Date(transaction.borrow_date)
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    transaction.return_date ? new Date(transaction.return_date) : null
  );

  const snackbar = useSnackbar();

  const handleEdit = () => {
    if (borrowDate)
      fetch(`/transaction/${transaction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrow_date: borrowDate.toISOString(),
          return_date: returnDate ? returnDate.toISOString() : null,
        }),
      })
        .then((res) =>
          res.json().then(() => {
            snackbar.makeMessage("Transaction updated successfully!");
            snackbar.makeOpen(true);
          })
        )
        .catch((err) => {
          snackbar.makeSeverity("error");
          snackbar.makeMessage(
            "Some error occurred while updating transaction."
          );
          snackbar.makeOpen(true);
          console.log(err);
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
        <b>Edit Transaction Details?</b>
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of borrowing"
            value={borrowDate}
            onChange={(newValue) => {
              setBorrowDate(newValue);
            }}
            renderInput={(params) => (
              <TextField fullWidth sx={{ mt: 2 }} {...params} />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of returning"
            value={returnDate}
            onChange={(newValue) => {
              setReturnDate(newValue);
            }}
            renderInput={(params) => (
              <TextField fullWidth sx={{ mt: 2 }} {...params} />
            )}
          />
        </LocalizationProvider>
        {returnDate && (
          <Button
            variant="outlined"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => {
              setReturnDate(null);
            }}
          >
            Book Not Returned
          </Button>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button color="inherit" onClick={handleOpen} sx={{ mr: 2 }}>
          <b>Cancel</b>
        </Button>
        <Button variant="contained" disableElevation onClick={handleEdit}>
          <b>Update</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

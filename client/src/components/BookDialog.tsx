import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Book } from "../types";
import { Transition } from "./Transition";

type Props = {
  book: Book;
  open: boolean;
  handleOpen: () => void;
};

export const BookDialog: FC<Props> = ({ book, open, handleOpen }) => {
  const [existingBook, setExistingBook] = useState<Book>();
  const [stock, setStock] = useState(0);

  useEffect(() => {
    fetch(`/book/${book.bookID}`).then((res) =>
      res.json().then((data) => {
        if (data.book) {
          setExistingBook(data.book);
          setStock(data.book.stock);
        }
      })
    );
  }, [book]);

  const [min, max] = [1, 50 - stock];
  const [number, setNumber] = useState(1);
  const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setNumber(min);
      return;
    }
    const value = +e.target.value;
    if (value > max) {
      setNumber(max);
    } else if (value < min) {
      setNumber(min);
    } else {
      setNumber(value);
    }
  };

  const snackbar = useSnackbar();

  const handleImport = () => {
    if (existingBook) {
      fetch(`/book/${existingBook.bookID}/stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: existingBook.stock + number }),
      })
        .then((response) => response.json())
        .then(() => {
          snackbar.makeMessage("Books imported successfully!");
          snackbar.makeOpen(true);
        })
        .catch(() => {
          snackbar.makeMessage("Some error occurred while importing.");
          snackbar.makeSeverity("error");
          snackbar.makeOpen(true);
        });
    } else {
      fetch("/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...book, stock: number }),
      })
        .then((response) => response.json())
        .then(() => {
          snackbar.makeMessage("Books imported successfully!");
          snackbar.makeOpen(true);
        })
        .catch(() => {
          snackbar.makeMessage("Some error occurred while importing.");
          snackbar.makeSeverity("error");
          snackbar.makeOpen(true);
        });
    }
    handleOpen();
  };

  const DialogContentObj = {
    "Title: ": book.title,
    "Author/s: ": book.authors,
    "Average rating: ": book.average_rating,
    "Print length: ": book.num_pages,
    "Language: ":
      book.language_code[0].toUpperCase() + book.language_code.slice(1),
    "Publisher: ": book.publisher,
    "Publication date: ": book.publication_date,
    "ISBN-10: ": book.isbn,
    "ISBN-13: ": book.isbn13,
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle>
        <b>Import Book?</b>
      </DialogTitle>
      <DialogContent>
        {Object.keys(DialogContentObj).map((key) => (
          <DialogContentText key={key} sx={{ mb: 1 }}>
            <b>{key}</b>
            {(DialogContentObj as any)[key]}
          </DialogContentText>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">
          <b>In stock: </b>
          {existingBook
            ? existingBook.stock === 1
              ? `${existingBook.stock} book`
              : `${existingBook.stock} books`
            : "0 books"}
        </Typography>
        <TextField
          autoFocus
          label="Enter number of books to be imported"
          margin="dense"
          id="number"
          type="number"
          InputProps={{ inputProps: { min, max } }}
          value={number}
          onChange={handleNumberInputChange}
          fullWidth
          sx={{ mt: 3 }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button color="inherit" onClick={handleOpen} sx={{ mr: 2 }}>
          <b>Cancel</b>
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={existingBook && existingBook.stock >= 50}
          onClick={handleImport}
        >
          <b>Import</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

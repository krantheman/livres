import { Link } from "react-router-dom";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, ChangeEvent } from "react";
import { Book } from "../types";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import BookCard from "../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    fetch("/books").then((res) =>
      res.json().then((data) => {
        setBooks(data.books);
      })
    );
  }, []);

  console.log(books);

  return (
    <Stack my={4}>
      <Stack direction="row" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Library Inventory
        </Typography>
        <Button
          component={Link}
          to="import"
          variant="contained"
          endIcon={<ImportExportIcon />}
          disableElevation
          sx={{ ml: "auto", py: 1 }}
        >
          <b>Import Books</b>
        </Button>
      </Stack>
      <TextField
        onChange={handleSearch}
        id="book-search"
        label="Search for a book or an author"
        variant="outlined"
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {books
        .filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.authors.toLowerCase().includes(search.toLowerCase())
        )
        .map((book) => (
          <BookCard key={book.bookID} book={book} />
        ))}
    </Stack>
  );
};

export default Books;

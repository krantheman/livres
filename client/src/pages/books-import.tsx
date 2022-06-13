import {
  Box,
  Button,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, ChangeEvent } from "react";
import { Book } from "../types";
import BookCard from "../components/BookCard";

const BooksImport = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const [page, setPage] = useState(1);
  const handlePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    fetch(
      `https://frappe.io/api/method/frappe-library?page=${page}&title=${search}&authors=${search}&isbn=${search}&publisher=${search}`
    )
      .then((res) =>
        res.json().then((data) => {
          let bookData = data.message;
          bookData.map((book: any) => {
            book.num_pages = book["  num_pages"];
            delete book["  num_pages"];
          });
          setBooks(bookData);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [search, page]);

  return (
    <Stack my={4}>
      <Stack direction="row" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Import New Books
        </Typography>
        <Button
          variant="contained"
          endIcon={<DownloadIcon />}
          sx={{ ml: "auto" }}
        >
          Import Books
        </Button>
      </Stack>
      <TextField
        onChange={handleSearch}
        id="book-search"
        label="Search for a book, author, isbn code or publisher"
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
      <Pagination
        count={200}
        onChange={handlePage}
        color="primary"
        sx={{ mx: "auto", mt: 2 }}
      />
    </Stack>
  );
};

export default BooksImport;

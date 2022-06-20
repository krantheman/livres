import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Box, CircularProgress } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import BookListItem from "../components/BookListItem";
import PageLayout from "../components/PageLayout";
import { Book } from "../types";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  }, []);

  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <PageLayout
      header="Library Inventory"
      buttonText="Import Books"
      buttonIcon={<ImportExportIcon />}
      searchLabel="Search for a book or an author"
      handleSearch={handleSearch}
      page="books"
    >
      {books.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            height: 600,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          {books
            .filter(
              (book) =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.authors.toLowerCase().includes(search.toLowerCase())
            )
            .map((book) => (
              <BookListItem key={book.bookID} book={book} />
            ))}
        </>
      )}
    </PageLayout>
  );
};

export default Books;

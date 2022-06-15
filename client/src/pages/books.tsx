import ImportExportIcon from "@mui/icons-material/ImportExport";
import { ChangeEvent, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import PageLayout from "../components/PageLayout";
import { Book } from "../types";

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

  return (
    <PageLayout
      header="Library Inventory"
      buttonText="Import Books"
      buttonIcon={<ImportExportIcon />}
      searchLabel="Search for a book or an author"
      handleSearch={handleSearch}
    >
      {books
        .filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.authors.toLowerCase().includes(search.toLowerCase())
        )
        .map((book) => (
          <BookCard key={book.bookID} book={book} />
        ))}
    </PageLayout>
  );
};

export default Books;

import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import PageLayout from "../components/PageLayout";
import { Book } from "../types";

const BooksImport = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const [page, setPage] = useState(1);
  const handlePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetch(
      `https://frappe.io/api/method/frappe-library?page=${page.toString()}&title=${search}&authors=${search}&isbn=${search}&publisher=${search}`
    )
      .then((res) =>
        res.json().then((data) => {
          let bookData = data.message;
          bookData.forEach((book: any) => {
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
    <PageLayout
      header="Import New Books"
      searchLabel="Search for a book, author, isbn code or publisher"
      handleSearch={handleSearch}
    >
      {books.map((book, id) => (
        <BookCard key={id} book={book} forImport />
      ))}
      <Pagination
        count={200}
        onChange={handlePage}
        color="primary"
        sx={{ mx: "auto", mt: 2 }}
      />
    </PageLayout>
  );
};

export default BooksImport;

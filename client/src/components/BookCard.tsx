import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import InventoryIcon from "@mui/icons-material/Inventory";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Button, Paper, Rating, Stack, Typography } from "@mui/material";
import { FC } from "react";
import bookImg from "../assets/book3.png";
import { Book } from "../types";

type Props = {
  book: Book;
  forImport?: boolean;
};

const BookCard: FC<Props> = ({ book, forImport }) => {
  return (
    <Paper elevation={0} sx={{ px: 4, py: 3 }}>
      <Stack direction="row" spacing={3}>
        <img src={bookImg} />
        <Stack py={1} width="70%">
          <Typography variant="h6" sx={{ fontWeight: "bold" }} noWrap>
            {book.title}
          </Typography>
          <Typography sx={{ color: "gray" }}>{book.authors}</Typography>
          <Rating
            name="read-only"
            value={parseFloat(book.average_rating)}
            precision={0.25}
            readOnly
          />
          <Stack direction="row" mt={1} spacing={1} alignItems="center">
            <ArticleIcon color="info" />
            <Typography sx={{ color: "gray" }}>
              {book.num_pages} pages
            </Typography>
            <LanguageIcon color="info" />
            <Typography sx={{ color: "gray" }}>
              {book.language_code[0].toUpperCase() +
                book.language_code.slice(1)}
            </Typography>
            <CalendarMonthIcon color="info" />
            <Typography sx={{ color: "gray" }}>
              {book.publication_date}
            </Typography>
            <CorporateFareIcon color="info" />
            <Typography sx={{ color: "gray" }} noWrap>
              {book.publisher}
            </Typography>
          </Stack>
        </Stack>
        <Box pt={1}>
          {forImport ? (
            <Button variant="outlined" endIcon={<AddIcon />}>
              <b>Import</b>
            </Button>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <InventoryIcon fontSize="large" color="info" />
              <Typography sx={{ color: "gray", fontWeight: "bold" }}>
                {book.stock === 1 ? "1 book" : `${book.stock} books`}
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default BookCard;

import { Badge, Box, Paper, Rating, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Book } from "../types";
import bookImg from "../assets/book3.png";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InventoryIcon from "@mui/icons-material/Inventory";

type Props = {
  book: Book;
};

const BookCard: FC<Props> = ({ book }) => {
  return (
    <Paper elevation={0} sx={{ px: 3, py: 2 }}>
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
            precision={0.1}
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
          <Stack direction="row" spacing={1} alignItems="center">
            <InventoryIcon fontSize="large" color="info" />
            <Typography sx={{ color: "gray", fontWeight: "bold" }}>
              {book.stock === 1 ? "1 book" : `${book.stock} books`}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default BookCard;

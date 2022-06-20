import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Button, Paper, Rating, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Book } from "../types";
import { BookDialog } from "./BookDialog";

type Props = {
  book: Book;
  forImport?: boolean;
};

const BookListItem: FC<Props> = ({ book, forImport }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <Paper
      elevation={0}
      sx={{ px: 4, py: 3, mb: 3, border: 1, borderColor: "lightgray" }}
    >
      <Stack direction="row" spacing={3}>
        <Stack py={1} width="90%">
          <Typography variant="h6" sx={{ fontWeight: "bold" }} noWrap>
            {book.title}
          </Typography>
          <Typography sx={{ color: "gray" }} noWrap>
            {book.authors}
          </Typography>
          <Rating
            name="read-only"
            value={parseFloat(book.average_rating)}
            precision={0.25}
            readOnly
          />
          <Stack direction="row" mt={1} spacing={1} alignItems="center">
            <ArticleIcon color="primary" />
            <Typography sx={{ color: "gray" }}>
              {book.num_pages} pages
            </Typography>
            <LanguageIcon color="primary" />
            <Typography sx={{ color: "gray" }}>
              {book.language_code[0].toUpperCase() +
                book.language_code.slice(1)}
            </Typography>
            <CalendarMonthIcon color="primary" />
            <Typography sx={{ color: "gray" }}>
              {book.publication_date}
            </Typography>
            <CorporateFareIcon color="primary" />
            <Typography sx={{ color: "gray" }} noWrap>
              {book.publisher}
            </Typography>
          </Stack>
        </Stack>
        <Box pt={1}>
          {forImport ? (
            <Button
              variant="outlined"
              endIcon={<AddIcon />}
              onClick={handleDialogOpen}
            >
              <b>Import</b>
            </Button>
          ) : (
            <Typography variant="h6" color="gray">
              Stock: <b>{book.stock}</b>
            </Typography>
          )}
        </Box>
      </Stack>
      {dialogOpen && (
        <BookDialog
          book={book}
          open={dialogOpen}
          handleOpen={handleDialogOpen}
        />
      )}
    </Paper>
  );
};

export default BookListItem;

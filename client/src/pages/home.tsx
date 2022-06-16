import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Book, Member } from "../types";

const Home = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members);
      });
  }, []);

  const [member, setMember] = useState<Member>();
  const handleMember = (event: any, newValue: Member | null) => {
    if (newValue) setMember(newValue);
  };

  const [book, setBook] = useState<Book>();
  const handleBook = (event: any, newValue: Book | null) => {
    if (newValue) setBook(newValue);
  };
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Box my={3}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Library Management System
      </Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Paper elevation={0} sx={{ width: "50%" }}>
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Lend a Book
            </Typography>
            <Autocomplete
              id="find-member"
              sx={{ mb: 3 }}
              onChange={handleMember}
              options={members}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Stack>
                    <Typography>{option.name}</Typography>
                    <Typography color="gray">{option.email}</Typography>
                  </Stack>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a member"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {member && (
              <Stack sx={{ mb: 3 }}>
                <Typography noWrap>{member.name}</Typography>
                <Typography color="gray" noWrap>
                  {member.email}
                </Typography>
              </Stack>
            )}
            <Autocomplete
              id="find-book"
              sx={{ mb: 3 }}
              onChange={handleBook}
              options={books}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Stack>
                    <Typography>{option.title}</Typography>
                    <Typography color="gray">{option.authors}</Typography>
                  </Stack>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a book"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {book && (
              <Stack sx={{ mb: 3 }}>
                <Typography noWrap>{book.title}</Typography>
                <Typography color="gray" noWrap>
                  {book.authors}
                </Typography>
              </Stack>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of lending"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Stack direction="row" sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                endIcon={<RestartAltIcon />}
                size="large"
                sx={{ mr: 1, width: "100%" }}
              >
                Reset Data
              </Button>
              <Button
                variant="contained"
                disableElevation
                endIcon={<ReceiptIcon />}
                size="large"
                sx={{ ml: 1, width: "100%" }}
              >
                Create Transaction
              </Button>
            </Stack>
          </Stack>
        </Paper>
        <Paper elevation={0}></Paper>
      </Stack>
    </Box>
  );
};

export default Home;

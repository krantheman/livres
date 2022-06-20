import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { green, indigo, red, yellow } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import borrowed from "../assets/borrowed.png";
import overdue from "../assets/overdue.png";
import returned from "../assets/returned.png";
import InfoCard from "../components/InfoCard";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Book, Member, Transaction } from "../types";
import { calculateDebt } from "../utils";

const Home = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [completeTransactionsLength, setCompleteTransactionsLength] =
    useState(0);
  const [dueTransactionsLength, setDueTransactionsLength] = useState(0);
  const [overdueTransactions, setOverdueTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const [member, setMember] = useState<Member>();
  const [memberInputValue, setMemberInputValue] = useState("");
  const handleMember = (event: any, newValue: Member | null) => {
    if (newValue) setMember(newValue);
  };

  const [book, setBook] = useState<Book>();
  const [bookInputValue, setBookInputValue] = useState("");
  const handleBook = (event: any, newValue: Book | null) => {
    if (newValue) setBook(newValue);
  };
  const [date, setDate] = useState<Date | null>(new Date());

  const handleReset = () => {
    setMember(undefined);
    setMemberInputValue("");
    setBook(undefined);
    setBookInputValue("");
  };

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
    fetch("/transactions")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const totalTransactions = data.transactions.length;
        const dueTransactions = data.transactions.filter(
          (transaction: Transaction) => !transaction.return_date
        );

        setDueTransactionsLength(dueTransactions.length);
        setCompleteTransactionsLength(
          totalTransactions - dueTransactions.length
        );

        const overdueTransactions = dueTransactions
          .filter(
            (transaction: Transaction) => calculateDebt(transaction) > 100
          )
          .map((transaction: Transaction) => ({
            id: transaction.id,
            book: transaction.book.title,
            member: transaction.member.name,
            borrowDate: transaction.borrow_date.toString().substring(0, 16),
            amount: calculateDebt(transaction),
          }));

        setOverdueTransactions(overdueTransactions);
      });
  }, [member, book]);

  const snackbar = useSnackbar();

  const handleCreateTransaction = () => {
    if (member && book && date)
      fetch("/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_id: member.id,
          book_id: book.bookID,
          borrow_date: date.toISOString(),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          snackbar.makeMessage("Transaction created successfully!");
          snackbar.makeOpen(true);
          handleReset();
        })
        .catch((err) => {
          snackbar.makeMessage(
            "Some error occurred while creating transaction."
          );
          snackbar.makeSeverity("error");
          snackbar.makeOpen(true);
          console.log(err.stack);
        });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Transaction ID", width: 150 },
    { field: "book", headerName: "Book", flex: 1 },
    { field: "member", headerName: "Member", width: 200 },
    { field: "borrowDate", headerName: "Borrowed On", width: 200 },
    { field: "amount", headerName: "Amount Due", width: 150 },
  ];

  return (
    <Box mt={3} mb={5}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Library Management System
      </Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={5}
      >
        <Stack sx={{ width: "35%" }} spacing={4}>
          <InfoCard
            color={green[50]}
            img={returned}
            header="Returned books"
            value={completeTransactionsLength.toString()}
          />
          <InfoCard
            color={yellow[50]}
            img={borrowed}
            header="Borrowed books"
            value={dueTransactionsLength.toString()}
          />
          <InfoCard
            color={red[50]}
            img={overdue}
            header="Overdue books"
            value={overdueTransactions.length.toString()}
          />
        </Stack>
        <Box sx={{ width: "65%" }}>
          <Stack>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
              Issue a Book
            </Typography>
            <Autocomplete
              id="find-member"
              sx={{ mb: 3 }}
              inputValue={memberInputValue}
              onInputChange={(event, newInputValue) => {
                setMemberInputValue(newInputValue);
              }}
              onChange={handleMember}
              options={members}
              getOptionDisabled={(option) => option.debt > 500}
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
            <Stack sx={{ mb: 3, borderRadius: 1, p: 2, bgcolor: indigo[50] }}>
              <Typography noWrap sx={{ height: 24 }}>
                {member ? member.name : " "}
              </Typography>
              <Typography color="gray" noWrap sx={{ height: 24 }}>
                {member ? member.email : " "}
              </Typography>
            </Stack>
            <Autocomplete
              id="find-book"
              sx={{ mb: 3 }}
              inputValue={bookInputValue}
              onInputChange={(event, newInputValue) => {
                setBookInputValue(newInputValue);
              }}
              onChange={handleBook}
              options={books}
              getOptionDisabled={(option) => option.stock === 0}
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
            <Stack sx={{ mb: 3, borderRadius: 1, p: 2, bgcolor: indigo[50] }}>
              <Typography noWrap sx={{ height: 24 }}>
                {book ? book.title : " "}
              </Typography>
              <Typography color="gray" noWrap sx={{ height: 24 }}>
                {book ? book.authors : " "}
              </Typography>
            </Stack>
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
                onClick={handleReset}
              >
                Reset Data
              </Button>
              <Button
                variant="contained"
                disableElevation
                endIcon={<ReceiptIcon />}
                size="large"
                sx={{ ml: 1, width: "100%" }}
                disabled={!(member && book && date)}
                onClick={handleCreateTransaction}
              >
                Create Transaction
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 5, mb: 2 }}>
        Overdue book list
      </Typography>
      <Box sx={{ height: 370 }}>
        <DataGrid
          rows={overdueTransactions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          autoHeight
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Home;

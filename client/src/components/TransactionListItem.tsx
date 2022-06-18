import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Transaction } from "../types";
import IsolatedMenu from "./IsolatedMenu";
import { TransactionDeleteDialog } from "./TransactionDeleteDialog";

type Props = {
  transaction: Transaction;
  editOpen: boolean;
  handleEditOpen: () => void;
  deleteOpen: boolean;
  handleDeleteOpen: () => void;
};

const TransactionListItem: FC<Props> = ({
  transaction,
  editOpen,
  handleEditOpen,
  deleteOpen,
  handleDeleteOpen,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{ mb: 3, p: 4, border: 1, borderColor: "lightgray" }}
    >
      <Stack direction="row">
        <Typography variant="h5" noWrap sx={{ width: "100%" }}>
          <b>{`Transaction ID: ${transaction.id}`}</b>
        </Typography>
        <IsolatedMenu
          transaction={transaction}
          editOpen={editOpen}
          handleEditOpen={handleEditOpen}
          deleteOpen={deleteOpen}
          handleDeleteOpen={handleDeleteOpen}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" noWrap mt={2}>
        <b>Member</b>
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Name: "}</b> {transaction.member.name}
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Email ID: "}</b> {transaction.member.email}
      </Typography>
      <Typography variant="h6" noWrap mt={1}>
        <b>Book</b>
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Title: "}</b> {transaction.book.title}
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Author/s: "}</b> {transaction.book.authors}
      </Typography>
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Borrowed on: "}</b>{" "}
        {transaction.borrow_date.toString().substring(0, 16)}
      </Typography>
      {transaction.return_date ? (
        <Typography sx={{ color: "gray" }} noWrap>
          <b>{"Returned on: "}</b>
          {transaction.return_date.toString().substring(0, 16)}
        </Typography>
      ) : (
        <Box mt={3}>
          <Button variant="outlined" endIcon={<DoneIcon />}>
            Book Received
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default TransactionListItem;

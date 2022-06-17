import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Transaction } from "../types";

type Props = {
  transaction: Transaction;
};

const TransactionListItem: FC<Props> = ({ transaction }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={0} sx={{ p: 4, border: 1, borderColor: "lightgray" }}>
      <Stack direction="row">
        <Typography variant="h5" noWrap sx={{ width: "100%" }}>
          <b>{`Transaction ID: ${transaction.id}`}</b>
        </Typography>
        <IconButton aria-label="more-button" onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "more-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
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
      <Typography sx={{ color: "gray" }} noWrap>
        <b>{"Returned on: "}</b>
        { transaction.return_date
          ? transaction.return_date.toString().substring(0, 16)
          : "N/A"}
      </Typography>
    </Paper>
  );
};

export default TransactionListItem;

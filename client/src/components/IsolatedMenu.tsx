import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { FC, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Transaction } from "../types";
import { TransactionDeleteDialog } from "./TransactionDeleteDialog";

type Props = {
  transaction: Transaction;
  editOpen: boolean;
  handleEditOpen: () => void;
  deleteOpen: boolean;
  handleDeleteOpen: () => void;
};

const IsolatedMenu: FC<Props> = ({
  transaction,
  editOpen,
  handleEditOpen,
  deleteOpen,
  handleDeleteOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-label="more"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        elevation={2}
      >
        <MenuItem
          onClick={() => {
            handleEditOpen();
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: blue[400] }} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteOpen();
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: red[400] }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      {deleteOpen && (
        <TransactionDeleteDialog
          open={deleteOpen}
          handleOpen={handleDeleteOpen}
          transaction={transaction}
        />
      )}
    </>
  );
};

export default IsolatedMenu;

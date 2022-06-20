import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton, ListItemIcon,
  ListItemText, Menu,
  MenuItem
} from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import { FC, useState } from "react";

type Props = {
  handleEditOpen: () => void;
  handleDeleteOpen: () => void;
};

const IsolatedMenu: FC<Props> = ({ handleEditOpen, handleDeleteOpen }) => {
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
            <EditIcon fontSize="small" sx={{ color: indigo[500] }} />
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
            <DeleteIcon fontSize="small" sx={{ color: red[500] }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default IsolatedMenu;

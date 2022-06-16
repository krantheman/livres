import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Member } from "../types";
import { Transition } from "./Transition";

type Props = {
  member: Member;
  open: boolean;
  handleOpen: () => void;
};

export const DeleteDialog: FC<Props> = ({ member, open, handleOpen }) => {
  const snackbar = useSnackbar();

  const handleDelete = () => {
    fetch(`/member/${member.id}`, {
      method: "DELETE",
    })
      .then(() => {
        snackbar.makeMessage("Member deleted successfully");
        snackbar.makeOpen(true);
      })

      .catch((err) => {
        console.log(err);
        snackbar.makeMessage("Some error occurred while deleting.");
        snackbar.makeSeverity("error");
        snackbar.makeOpen(true);
      });
    handleOpen();
  };

  const DialogContentObj = {
    "Name: ": member.name,
    "Email ID: ": member.email,
    "Phone number: ": member.phone_no,
    "Address: ": member.address,
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle>
        <b>Delete Member?</b>
      </DialogTitle>
      <DialogContent>
        {Object.keys(DialogContentObj).map((key) => (
          <DialogContentText key={key} sx={{ mb: 1 }}>
            <b>{key}</b>
            {(DialogContentObj as any)[key]}
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button color="inherit" onClick={handleOpen} sx={{ mr: 2 }}>
          <b>Cancel</b>
        </Button>
        <Button
          variant="contained"
          color="error"
          disableElevation
          onClick={handleDelete}
        >
          <b>Delete</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

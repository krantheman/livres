import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Member } from "../types";
import { Transition } from "./Transition";

type Props = {
  open: boolean;
  handleOpen: () => void;
  member?: Member;
};

export const MemberDialog: FC<Props> = ({ open, handleOpen, member }) => {
  const [name, setName] = useState(member ? member.name : "");
  const [nameError, setNameError] = useState("");
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState(member ? member.email : "");
  const [emailError, setEmailError] = useState("");
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [phoneNo, setPhoneNo] = useState(
    member ? member.phone_no.toString() : ""
  );
  const [phoneNoError, setPhoneNoError] = useState("");
  const handlePhoneNo = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value);
  };

  const [address, setAddress] = useState(member ? member.address : "");
  const [addressError, setAddressError] = useState("");
  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const snackbar = useSnackbar();

  const handleAdd = async () => {
    setNameError("");
    setEmailError("");
    setPhoneNoError("");
    setAddressError("");
    if (!name.trim()) setNameError("Name cannot be empty.");
    else if (!email.trim()) setEmailError("Enter valid email ID.");
    else if (!phoneNo.trim()) setPhoneNoError("Enter valid phone number.");
    else if (!address.trim()) setAddressError("Enter valid address.");
    // For editing member details
    else if (member) {
      fetch(`/member/${member.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
        }),
      })
        .then((res) =>
          res.json().then(() => {
            snackbar.makeSeverity("success");
            snackbar.makeMessage("Member details updated successfully!");
            snackbar.makeOpen(true);
            handleOpen();
          })
        )
        .catch((err) => {
          snackbar.makeMessage("Some error occurred while updating details.");
          snackbar.makeSeverity("error");
          snackbar.makeOpen(true);
          console.log(err);
        });
      // For adding new member
    } else
      await fetch(`/member?email=${email}&phone_no=${phoneNo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.member) {
            if (data.member.email === email) {
              setEmailError("User with this email ID already exists.");
            } else if (data.member.phone_no === parseInt(phoneNo)) {
              setPhoneNoError("User with this phone number already exists.");
            }
            return;
          }

          fetch("/member", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              address,
              phone_no: parseInt(phoneNo),
              debt: 0,
            }),
          })
            .then((res) => res.json())
            .then(() => {
              snackbar.makeSeverity("success");
              snackbar.makeMessage("New member added successfully!");
              snackbar.makeOpen(true);
              handleOpen();
            })

            .catch((err) => {
              snackbar.makeMessage("Some error occurred while registering.");
              snackbar.makeSeverity("error");
              snackbar.makeOpen(true);
              console.log(err);
            });
        })

        .catch((err) => {
          snackbar.makeMessage("Some error occurred while registering.");
          snackbar.makeSeverity("error");
          snackbar.makeOpen(true);
          console.log(err);
        });
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ px: 4, pt: 4 }}>
        <b>{member ? "Edit Member Details" : "Add New Member"}</b>
      </DialogTitle>
      <DialogContent sx={{ px: 4 }}>
        <TextField
          autoFocus
          value={name}
          label="Name"
          margin="dense"
          id="name"
          fullWidth
          onChange={handleName}
          error={!!nameError}
          helperText={nameError}
          sx={{ mb: 1 }}
        />
        <TextField
          value={email}
          label="Email ID"
          margin="dense"
          id="email"
          type="email"
          fullWidth
          disabled={!!member}
          onChange={handleEmail}
          error={!!emailError}
          helperText={emailError}
          sx={{ mb: 1 }}
        />
        <TextField
          value={phoneNo}
          label="Phone Number"
          margin="dense"
          id="number"
          type="number"
          fullWidth
          disabled={!!member}
          onChange={handlePhoneNo}
          error={!!phoneNoError}
          helperText={phoneNoError}
          sx={{ mb: 1 }}
        />
        <TextField
          value={address}
          label="Street Address"
          margin="dense"
          id="address"
          fullWidth
          onChange={handleAddress}
          error={!!addressError}
          helperText={addressError}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 4, px: 4 }}>
        <Button
          size="large"
          color="inherit"
          onClick={handleOpen}
          sx={{ mr: 2 }}
        >
          <b>Cancel</b>
        </Button>
        <Button
          size="large"
          variant="contained"
          disableElevation
          onClick={handleAdd}
        >
          <b>{member ? "Update" : "Register"}</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import { Slide } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import {
  ChangeEvent,
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useState,
} from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

const Transition = forwardRef(function Transition(
  transitionProps: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...transitionProps} />;
});

type Props = {
  open: boolean;
  handleOpen: () => void;
};

export const MemberDialog: FC<Props> = ({ open, handleOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const handlePhoneNo = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value);
  };

  const [address, setAddress] = useState("");
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
    else
      await fetch(`/member?email=${email}&phone_no=${phoneNo}`)
        .then((res) =>
          res.json().then((data) => {
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
              }),
            })
              .then((res) =>
                res.json().then(() => {
                  snackbar.makeSeverity("success");
                  snackbar.makeMessage("New member added successfully!");
                  snackbar.makeOpen(true);
                  handleOpen();
                })
              )
              .catch((err) => {
                snackbar.makeMessage("Some error occurred while registering.");
                snackbar.makeSeverity("error");
                snackbar.makeOpen(true);
                console.log(err);
              });
          })
        )
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
      fullWidth
    >
      <DialogTitle sx={{ px: 6, pt: 4 }}>
        <b>Add New Member</b>
      </DialogTitle>
      <DialogContent sx={{ px: 6 }}>
        <TextField
          autoFocus
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
          label="Email ID"
          margin="dense"
          id="email"
          type="email"
          fullWidth
          onChange={handleEmail}
          error={!!emailError}
          helperText={emailError}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Phone Number"
          margin="dense"
          id="number"
          type="number"
          fullWidth
          onChange={handlePhoneNo}
          error={!!phoneNoError}
          helperText={phoneNoError}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Street Address"
          margin="dense"
          id="address"
          fullWidth
          onChange={handleAddress}
          error={!!addressError}
          helperText={addressError}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 4, px: 6 }}>
        <Button color="inherit" onClick={handleOpen} sx={{ mr: 2 }}>
          <b>Cancel</b>
        </Button>
        <Button variant="contained" disableElevation onClick={handleAdd}>
          <b>Register</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

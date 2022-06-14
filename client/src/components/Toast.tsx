import { Alert, Snackbar } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

type Props = {};

const Toast: FC<Props> = () => {
  const snackbar = useSnackbar();

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    snackbar.makeOpen(false);
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

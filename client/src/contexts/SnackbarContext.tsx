import { AlertColor } from "@mui/material";
import { createContext, FC, ReactNode, useContext, useState } from "react";

type SnackbarContextType = {
  open: boolean;
  makeOpen: (value: boolean) => void;
  severity: AlertColor;
  makeSeverity: (value: AlertColor) => void;
  message: string;
  makeMessage: (value: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  open: false,
  makeOpen: () => {},
  severity: "success",
  makeSeverity: () => {},
  message: "",
  makeMessage: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

type Props = {
  children: ReactNode;
};

export const SnackbarContextProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const makeOpen = (value: boolean): void => setOpen(value);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const makeSeverity = (value: AlertColor): void => setSeverity(value);
  const [message, setMessage] = useState("");
  const makeMessage = (value: string): void => setMessage(value);
  const contextValue = {
    open,
    makeOpen,
    severity,
    makeSeverity,
    message,
    makeMessage,
  };
  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

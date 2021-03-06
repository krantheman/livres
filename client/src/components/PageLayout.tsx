import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, ReactElement, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { MemberDialog } from "./MemberDialog";

type Props = {
  header: string;
  buttonText?: string;
  buttonIcon?: ReactElement;
  searchLabel: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  page?: "books" | "members";
  addDialogOpen?: boolean;
  handleAddDialogOpen?: () => void;
};

const PageLayout: FC<Props> = ({
  header,
  buttonText,
  buttonIcon,
  searchLabel,
  handleSearch,
  children,
  page,
  addDialogOpen,
  handleAddDialogOpen,
}) => {
  const buttonProps: any = {
    variant: "contained",
    endIcon: buttonIcon,
    disableElevation: true,
    sx: { ml: "auto", py: 1 },
  };

  return (
    <Stack my={3}>
      <Stack direction="row" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {header}
        </Typography>
        {page === "books" && (
          <Button component={Link} to="import" {...buttonProps}>
            <b>{buttonText}</b>
          </Button>
        )}
        {page === "members" && (
          <Button onClick={handleAddDialogOpen} {...buttonProps}>
            <b>{buttonText}</b>
          </Button>
        )}
      </Stack>
      <TextField
        onChange={handleSearch}
        id="search"
        label={searchLabel}
        variant="outlined"
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {children}
      {addDialogOpen && handleAddDialogOpen && (
        <MemberDialog open={addDialogOpen} handleOpen={handleAddDialogOpen} />
      )}
    </Stack>
  );
};

export default PageLayout;

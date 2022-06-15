import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  header: string;
  buttonText?: string;
  buttonIcon?: ReactElement;
  searchLabel: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
};

const PageLayout: FC<Props> = ({
  header,
  buttonText,
  buttonIcon,
  searchLabel,
  handleSearch,
  children,
}) => {
  return (
    <Stack my={4}>
      <Stack direction="row" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {header}
        </Typography>
        {buttonText && (
          <Button
            variant="contained"
            component={Link}
            to="import"
            endIcon={buttonIcon}
            disableElevation
            sx={{ ml: "auto", py: 1 }}
          >
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
    </Stack>
  );
};

export default PageLayout;

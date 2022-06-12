import { AppBar, Button, Link, Stack, Toolbar } from "@mui/material";
import { FC } from "react";
import logo from "../assets/logo.svg";

// #E45853
const NavBar: FC = () => {
  return (
    <AppBar elevation={0} position="static" color="transparent" sx={{ py: 1 }}>
      <Toolbar>
        <img src={logo} height={46} />
        <Stack direction="row" spacing={3} alignItems="center" ml="auto">
          <Button href="books" sx={{ fontWeight: "bold" }} >
            Books
          </Button>
          <Button href="members" sx={{ fontWeight: "bold" }}>
            Members
          </Button>
          <Button
            href="transactions"
            sx={{ fontWeight: "bold" }}
          >
            Transactions
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

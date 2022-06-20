import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/livres.svg";

const NavBar: FC = () => {
  return (
    <AppBar elevation={0} position="static" color="transparent" sx={{ py: 1 }}>
      <Toolbar sx={{ mx: -3 }}>
        <Link to="/">
          <img src={logo} alt="logo" height={32} />
        </Link>
        <Stack direction="row" spacing={3} alignItems="center" ml="auto">
          <Button component={Link} to="books" sx={{ fontWeight: "bold" }}>
            BOOKS
          </Button>
          <Button component={Link} to="members" sx={{ fontWeight: "bold" }}>
            MEMBERS
          </Button>
          <Button
            component={Link}
            to="transactions"
            sx={{ fontWeight: "bold" }}
          >
            TRANSACTIONS
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

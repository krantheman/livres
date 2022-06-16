import { AppBar, Box, Button, Container, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { FC } from "react";
import logo from "../assets/logo.svg";

// #E45853
const NavBar: FC = () => {
  return (
    <Box sx={{ bgcolor: "white" }}>
      <Container>
        <AppBar
          elevation={0}
          position="static"
          color="transparent"
          sx={{ py: 1 }}
        >
          <Toolbar>
            <Link to="/">
              <img src={logo} alt="logo" height={46} />
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
      </Container>
    </Box>
  );
};

export default NavBar;

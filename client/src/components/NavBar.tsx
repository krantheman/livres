import { AppBar, Box, Button, Container, Stack, Toolbar } from "@mui/material";
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
            <img src={logo} height={46} />
            <Stack direction="row" spacing={3} alignItems="center" ml="auto">
              <Button href="books" sx={{ fontWeight: "bold" }}>
                BOOKS
              </Button>
              <Button href="members" sx={{ fontWeight: "bold" }}>
                MEMBERS
              </Button>
              <Button href="transactions" sx={{ fontWeight: "bold" }}>
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

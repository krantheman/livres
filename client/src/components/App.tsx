import Books from "../pages/books";
import Home from "../pages/home";
import NavBar from "./NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#473198",
    },
    secondary: {
      main: "#ADFC92",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <NavBar />
        {/* <Books /> */}
      </Container>
    </ThemeProvider>
  );
};

export default App;

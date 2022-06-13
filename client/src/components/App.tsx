import Books from "../pages/books";
import Home from "../pages/home";
import NavBar from "./NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import BooksImport from "../pages/books-import";

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
      <Container>
        <NavBar />
        {/* <Books /> */}
        <BooksImport />
      </Container>
    </ThemeProvider>
  );
};

export default App;

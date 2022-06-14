import Books from "../pages/books";
import Home from "../pages/home";
import NavBar from "./NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Box, Container, Snackbar } from "@mui/material";
import BooksImport from "../pages/books-import";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#7b2cbf",
  //   },
  //   secondary: {
  //     main: "#ADFC92",
  //   },
  // },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "white" }}>
        <NavBar />
        <Container>
          {/* <Books /> */}
          <BooksImport />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;

import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarContextProvider } from "../contexts/SnackbarContext";
import Books from "../pages/books";
import BooksImport from "../pages/books-import";
import Home from "../pages/home";
import Members from "../pages/members";
import NavBar from "./NavBar";
import Toast from "./Toast";

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
    <BrowserRouter>
      <SnackbarContextProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/import" element={<BooksImport />} />
              <Route path="/members" element={<Members />} />
            </Routes>
          </Container>
          <Toast />
        </ThemeProvider>
      </SnackbarContextProvider>
    </BrowserRouter>
  );
};

export default App;

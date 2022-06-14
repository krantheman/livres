import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarContextProvider } from "../contexts/SnackbarContext";
import BooksImport from "../pages/books-import";
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
    <SnackbarContextProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "white" }}>
          <NavBar />
          <Container>
            {/* <Books /> */}
            <BooksImport />
          </Container>
          <Toast />
        </Box>
      </ThemeProvider>
    </SnackbarContextProvider>
  );
};

export default App;

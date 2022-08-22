import { Add } from "@mui/icons-material";
import { Button, ThemeProvider } from "@mui/material";
import "./App.css";
import { AddButton } from "./styles/Style";
import { theme } from "./styles/theme/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AddButton startIcon={<Add />}>Add List</AddButton>
      </ThemeProvider>
    </div>
  );
}

export default App;

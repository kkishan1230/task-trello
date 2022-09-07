import { Add } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import InputCard from "./components/InputCard";
import {
  AddButton,
  Container,
  FlexContainer,
  InputCardStyle,
} from "./styles/Style";
import { theme } from "./styles/theme/Theme";
import { useSelector, useDispatch } from "react-redux";
import { show } from "../src/allStates/SliceActions";
import { useEffect } from "react";
import CompletedTitles from "./components/completedTitles";

//Local storage initial data
var data = [];
//

function App() {
  useEffect(() => {
    if (
      localStorage.getItem("Titles") === null ||
      localStorage.getItem("Titles") === undefined
    ) {
      data = JSON.stringify(data);
      localStorage.setItem("Titles", data);
      localStorage.setItem("Unique_Id", 1);
    }
  }, []);

  const selector = useSelector((state) => {
    return state.inputStates.show;
  });
  const dispatch = useDispatch();
  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>
          <FlexContainer>
            <CompletedTitles />
            <Container>
              <AddButton
                sx={{
                  height: "40px",
                }}
                startIcon={<Add />}
                onClick={() => dispatch(show())}
              >
                Add List
              </AddButton>
              <InputCardStyle display={selector ? "none" : "inline"}>
                <InputCard />
              </InputCardStyle>
            </Container>
          </FlexContainer>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;

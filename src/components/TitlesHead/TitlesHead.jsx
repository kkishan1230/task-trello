import { Add, Close, Delete } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCardButton,
  CardContainer,
  CardContainerFlex,
} from "../../styles/InputCards/Styles";
import { addButton } from "../../allStates/SliceActions";

function TitlesHead() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    return state.inputStates.show;
  });

  const addCard = useSelector((state) => {
    return state.inputStates.addButton;
  });

  useEffect(() => {
    if (localStorage.getItem === null) {
      localStorage.setItem("Titles", JSON.stringify([]));
    } else {
      setData1(JSON.parse(localStorage.getItem("Titles")));
    }
  }, [selector]);
  const [state, setState] = useState(false);
  const [data1, setData1] = useState([]);
  const [key, setKey] = useState(0);

  return (
    data1 !== null && (
      <CardContainerFlex>
        {data1.map((dt) => {
          return (
            <form key={dt.Id.toString()}>
              <CardContainer>
                <TextField
                  variant={!state ? "standard" : "outlined"}
                  className="text-withoutBorder"
                  onFocus={(el) => {
                    setState(true);
                  }}
                  defaultValue={dt.TaskName}
                  size="small"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    padding: !state ? "8px 14px 1px 14px" : null,
                    marginBottom: !state ? "20px" : "18px",
                    textDecoration: "none",
                  }}
                />
                <IconButton>
                  <Delete color="warning" />
                </IconButton>
                {addCard && key == dt.Id ? (
                  <>
                    <Paper
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <TextareaAutosize
                        placeholder="Enter a title for this card..."
                        style={{
                          maxWidth: "188px",
                          minWidth: "188px",
                          maxHeight: "44px",
                          minHeight: "44px",
                          borderRadius: 5,
                          border: "none",
                          resize: "none",
                          variant: "standard",
                          padding: 10,
                        }}
                      />
                    </Paper>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(addButton());
                      }}
                    >
                      Add Card
                    </Button>
                    <IconButton
                      onClick={() => {
                        dispatch(addButton());
                      }}
                    >
                      <Close fontSize="large" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <AddCardButton
                      startIcon={<Add />}
                      onClick={(el) => {
                        setState(!state);
                        dispatch(addButton());
                        setKey(dt.Id);
                      }}
                      sx={{
                        padding: "0",
                        color: "rgba(0,0,0,0.5)",
                        "&:hover": {
                          color: "black",
                        },
                      }}
                    >
                      Add Card
                    </AddCardButton>
                  </>
                )}
              </CardContainer>
            </form>
          );
        })}
      </CardContainerFlex>
    )
  );
}

export default TitlesHead;

import { Add, Close, Delete, Edit } from "@mui/icons-material";
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
  PaperCard,
} from "../../styles/InputCards/Styles";
import {
  addButton,
  addCardTitle,
  darkFilter,
} from "../../allStates/SliceActions";

function TitlesHead() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    return state.inputStates.show;
  });

  const addCard = useSelector((state) => {
    return state.inputStates.addButton;
  });
  const extra = useSelector((state) => {
    return state.inputStates.addCardTitle;
  });

  useEffect(() => {
    if (localStorage.getItem === null) {
      localStorage.setItem("Titles", JSON.stringify([]));
    } else {
      setData1(JSON.parse(localStorage.getItem("Titles")));
      if (data1 !== null && data1.length !== 0) {
        var obj = data1[0].addCardTitles;
        console.log(obj);
      }
    }
  }, [selector]);
  const [state, setState] = useState(false);
  const [data1, setData1] = useState([]);
  const [key, setKey] = useState(0);

  // functions

  const addCardTitlesToLS = (dt) => {
    dt.addCardTitles.push(extra);
    data1[dt.Id - 1] = dt;
    localStorage.setItem("Titles", JSON.stringify(data1));
    setData1(data1);
  };

  return (
    data1 !== null && (
      <CardContainerFlex>
        {data1.map((dt) => {
          return (
            <form key={dt.Id.toString()}>
              <CardContainer>
                <div style={{ display: "flex", alignItems: "center" }}>
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
                      textDecoration: "none",
                      width: "190px",
                    }}
                  />
                  <IconButton>
                    <Delete color="warning" fontSize="large" />
                  </IconButton>
                </div>
                {dt.addCardTitles.map((dt) => {
                  return (
                    <PaperCard>
                      {dt}
                      <IconButton
                        onClick={() => dispatch(darkFilter())}
                        size="small"
                        sx={{
                          fontSize: "12px",
                          position: "absolute",
                          right: "0",
                          top: "5px",
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </PaperCard>
                  );
                })}
                {addCard && key === dt.Id ? (
                  <>
                    <Paper
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <TextareaAutosize
                        onChange={(el) => {
                          dispatch(addCardTitle(el.target.value));
                        }}
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
                        addCardTitlesToLS(dt);
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
                      onClick={() => {
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

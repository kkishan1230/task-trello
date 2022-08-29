import { Add, Close, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCardButton,
  CardContainer,
  CardContainerFlex,
} from "../../styles/InputCards/Styles";
import {
  addButton,
  addCardTitle,
  darkFilter,
  dataFromClick,
  titleData,
} from "../../allStates/SliceActions";
import ModalContents from "../ModalContents/ModalContents";
import { ModalFlex } from "../ModalContents/ModalContentsStyles";

function TitlesHead() {
  const dispatch = useDispatch();

  const darkFilters = useSelector((state) => {
    return state.inputStates.darkFilter;
  });
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
      }
    }
  }, [selector]);
  const [state, setState] = useState(false);
  const [data1, setData1] = useState([]);
  const [key, setKey] = useState(0);

  // functions

  const addCardTitlesToLS = (dt) => {
    dt.addCardTitles.push(extra.id);
    data1[dt.Id - 1] = dt;
    localStorage.setItem("Titles", JSON.stringify(data1));
    setData1(data1);
  };

  return (
    data1 !== null && (
      <>
        <CardContainerFlex>
          {data1.map((dt) => {
            return (
              <form key={dt.Id.toString()}>
                <CardContainer>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      variant={!state ? "standard" : "outlined"}
                      className="text_withoutBorder"
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
                        width: "100%",
                      }}
                    />
                  </div>
                  {dt.addCardTitles.map((data, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          display: "flex",
                        }}
                      >
                        <Modal
                          open={darkFilters}
                          onClose={() => dispatch(darkFilter())}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <ModalContents />
                        </Modal>
                        <Paper
                          onClick={(el) => {
                            dispatch(dataFromClick(el.target.textContent));
                            dispatch(darkFilter());
                            dispatch(titleData(dt));
                          }}
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            boxShadow: "0 2px 2px rgb(163, 163, 163)",
                            width: "100%",
                            padding: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {data}
                        </Paper>
                      </div>
                    );
                  })}
                  {addCard && key === dt.Id ? (
                    <>
                      <ModalFlex>
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
                              border: "none",
                              boxShadow: "none",
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
                      </ModalFlex>
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
      </>
    )
  );
}

export default TitlesHead;

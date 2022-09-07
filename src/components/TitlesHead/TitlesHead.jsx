import { Add, Close } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Modal,
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
import {
  addButton,
  darkFilter,
  dataFromClick,
  dataOfTable,
  titleData,
  contentId,
  subContentId,
  dataLocal,
  Unique_Id,
  deadLine,
} from "../../allStates/SliceActions";
import ModalContents from "../ModalContents/ModalContents";
import { FlexOnly, ModalFlex } from "../ModalContents/ModalContentsStyles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TitlesHead() {
  const dispatch = useDispatch();

  // selectors
  const dataLocal = useSelector((state) => {
    return state.inputStates.dataLocal;
  });

  const darkFilters = useSelector((state) => {
    return state.inputStates.darkFilter;
  });
  const selector = useSelector((state) => {
    return state.inputStates.show;
  });

  const addCard = useSelector((state) => {
    return state.inputStates.addButton;
  });

  const Titles_UniqueId = useSelector((state) => {
    return state.inputStates.Unique_Id;
  });

  // UseEffect

  useEffect(() => {
    if (localStorage.getItem === null) {
      localStorage.setItem("Titles", JSON.stringify([]));
    } else {
      setData1(JSON.parse(localStorage.getItem("Titles")));
    }
  }, [selector]);

  // all states
  const [state, setState] = useState(false);
  const [data1, setData1] = useState([]);
  const [key, setKey] = useState(0);
  const [titleText, setTitleText] = useState("");

  // functions
  const addToLS = (dt) => {
    var y = { TitleName: titleText };
    y["id"] = Titles_UniqueId;
    dispatch(Unique_Id());
    var x = JSON.parse(localStorage.getItem("Titles"));
    x[dt.Id - 1].addCardTitles.push(y);
    localStorage.setItem("Titles", JSON.stringify(x));
    setData1(x);
    localStorage.setItem("Unique_Id", Titles_UniqueId);
  };

  const setdeadLine = (id1, id2) => {
    if (dataLocal !== null && dataLocal !== undefined) {
      dataLocal[id1 - 1].addCardTitles.forEach((element) => {
        if (element.dueDate !== undefined && element.id === id2) {
          dispatch(deadLine(element.dueDate));
        }
      });
    }
  };

  const handleDragEnd = (array, result) => {
    // console.log(array, result);
    if (result.destination.droppableId === result.source.droppableId) {
      console.log("working");
    }
  };

  return (
    data1 !== null && (
      <>
        <Modal
          open={darkFilters}
          onClose={() => dispatch(darkFilter())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalContents />
        </Modal>

        <DragDropContext onDragEnd={(result) => handleDragEnd(data1, result)}>
          <CardContainerFlex>
            {data1.map((dt) => {
              return (
                <form key={dt.Id.toString()}>
                  <Droppable droppableId={`${dt.Id}`}>
                    {(provided) => (
                      <CardContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
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
                            <Draggable
                              key={index}
                              draggableId={`${data.id}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  style={{
                                    position: "relative",
                                    display: "flex",
                                  }}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                >
                                  {provided.placeholder}
                                  <Paper
                                    onClick={(el) => {
                                      dispatch(
                                        dataFromClick(el.target.textContent)
                                      );

                                      dispatch(darkFilter());
                                      dispatch(titleData(data));
                                      dispatch(dataOfTable(dt));
                                      dispatch(contentId(dt.Id));
                                      dispatch(subContentId(data));
                                      setdeadLine(dt.Id, data.id);
                                    }}
                                    sx={{
                                      backgroundColor: "white",
                                      borderRadius: "5px",
                                      boxShadow: "0 2px 2px rgb(163, 163, 163)",
                                      width: "90%",
                                      padding: "10px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {data.TitleName}
                                  </Paper>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}

                        {addCard && key === dt.Id ? (
                          <>
                            <Paper>
                              <ModalFlex flexDirection={"column"} gap="10px">
                                <TextareaAutosize
                                  onChange={(el) => {
                                    setTitleText(el.target.value);
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
                                    // eslint-disable-next-line
                                    border: "none",
                                    boxShadow: "none",
                                  }}
                                />
                                <FlexOnly gap={"10px"}>
                                  <Button
                                    disabled={Boolean(titleText) ? false : true}
                                    variant="contained"
                                    onClick={() => {
                                      dispatch(addButton());
                                      setTitleText(null);
                                      addToLS(dt);
                                      var x = JSON.parse(
                                        localStorage.getItem("Titles")
                                      );
                                      dispatch(dataLocal(x));
                                    }}
                                  >
                                    Add Card
                                  </Button>
                                  <IconButton
                                    sx={{
                                      padding: "0",
                                    }}
                                    onClick={() => {
                                      dispatch(addButton());
                                    }}
                                  >
                                    <Close fontSize="large" />
                                  </IconButton>
                                </FlexOnly>
                              </ModalFlex>
                            </Paper>
                          </>
                        ) : (
                          <>
                            {provided.placeholder}
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
                    )}
                  </Droppable>
                </form>
              );
            })}
          </CardContainerFlex>
        </DragDropContext>
      </>
    )
  );
}

export default TitlesHead;

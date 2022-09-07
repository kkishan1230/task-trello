import {
  Close,
  RemoveRedEyeOutlined,
  SubjectOutlined,
  VideoLabelOutlined,
} from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contentId,
  darkFilter,
  deadLine,
  dataLocal,
} from "../../allStates/SliceActions";
import AddOptions from "./AddOptions";
import Members from "./Members";
import {
  AddDesPaper,
  DeadlineButton,
  FlexOnly,
  MembersButton,
  ModalContentBox,
  ModalFlex,
  PriorityLabel,
  TextAreaForDesc,
  TransparentButton,
} from "./ModalContentsStyles";

function ModalContents() {
  const dispatch = useDispatch();
  // Selectors

  const memberMail = useSelector((state) => {
    return state.inputStates.memberMail;
  });

  const datafromClick = useSelector((state) => {
    return state.inputStates.dataFromClick;
  });

  const contentsId = useSelector((state) => {
    return state.inputStates.contentId;
  });

  const subContentId = useSelector((state) => {
    return state.inputStates.subContentId;
  });

  const dataLocal_data = useSelector((state) => {
    return state.inputStates.dataLocal;
  });

  const deadDate = useSelector((state) => {
    return state.inputStates.deadLine;
  });
  // Functions

  const addDescToLS = () => {
    var x = JSON.parse(localStorage.getItem("Titles"));
    for (var a = 0; a < x[contentsId - 1].addCardTitles.length; a++) {
      if (x[contentsId - 1].addCardTitles[a].id === subContentId.id) {
        x[contentsId - 1].addCardTitles[a]["cardDescription"] = descText;
        dispatch(dataLocal(x));
        localStorage.setItem("Titles", JSON.stringify(x));
        console.log(x);
        return;
      }
    }
  };

  // All states
  const [state, setState] = useState(false);
  const [descText, setDescText] = useState(() => {
    for (
      var a = 0;
      a < dataLocal_data[contentsId - 1].addCardTitles.length;
      a++
    ) {
      if (
        dataLocal_data[contentsId - 1].addCardTitles[a].id === subContentId.id
      ) {
        return dataLocal_data[contentsId - 1].addCardTitles[a].cardDescription;
      }
    }
  });
  const [Arr, setArr] = useState([]);

  return (
    <ModalContentBox>
      <ModalFlex alignItems="center">
        <ModalFlex
          sx={{
            gap: "20px",
          }}
          alignItems="center"
        >
          <VideoLabelOutlined />
          <TextField
            size="small"
            marginLeft="20px"
            defaultValue={datafromClick}
            placeholder={""}
          />
        </ModalFlex>
        <IconButton onClick={() => dispatch(darkFilter())}>
          <Close />
        </IconButton>
      </ModalFlex>
      <FlexOnly gap="10px">
        <Typography marginLeft="50px">in list in progress</Typography>
        <RemoveRedEyeOutlined />
      </FlexOnly>
      <FlexOnly
        alignItems={"center"}
        gap="10px"
        marginLeft={"50px"}
        marginTop="20px"
      >
        {dataLocal_data[contentsId - 1].addCardTitles.map((x) => {
          if (x.member !== undefined && x.id === subContentId.id) {
            return (
              <FlexOnly flexDirection={"column"}>
                <Typography fontWeight={"bold"}>Members</Typography>
                {dataLocal_data[contentsId - 1].addCardTitles.map((dt) => {
                  if (dt.member !== undefined && dt.id === subContentId.id) {
                    return (
                      <FlexOnly gap="5px">
                        {dt.member.map((mem) => {
                          return (
                            <MembersButton
                              size="small"
                              variant="contained"
                              sx={{
                                textAlign: "center",
                                color: "white",
                                background: "purple",
                              }}
                            >
                              {mem[0]}
                            </MembersButton>
                          );
                        })}
                      </FlexOnly>
                    );
                  }
                })}
              </FlexOnly>
            );
          }
        })}

        {dataLocal_data[contentsId - 1].addCardTitles.map((el) => {
          if (
            el.dueDate !== undefined &&
            el.dueDate !== null &&
            el.id === subContentId.id
          ) {
            console.log(el.dueDate);
            return (
              <FlexOnly flexDirection={"column"}>
                <Typography fontWeight={"bold"}>Due Date</Typography>
                <DeadlineButton>
                  {deadDate === null ? el.dueDate : deadDate}
                </DeadlineButton>
              </FlexOnly>
            );
          }
        })}

        {dataLocal_data[contentsId - 1].addCardTitles.map((elm) => {
          if (elm.priority !== undefined && elm.id === subContentId.id) {
            return (
              <FlexOnly flexDirection={"column"}>
                <Typography fontWeight={"bold"}>Priority</Typography>
                <PriorityLabel
                  sx={{
                    backgroundColor:
                      elm.priority === "Urgent"
                        ? "red"
                        : elm.priority === "Medium"
                        ? "orange"
                        : "green",
                    "&:hover": {
                      backgroundColor:
                        elm.priority === "Urgent"
                          ? "red"
                          : elm.priority === "Medium"
                          ? "orange"
                          : "green",
                      opacity: "0.7",
                    },
                  }}
                >
                  {elm.priority}
                </PriorityLabel>
              </FlexOnly>
            );
          }
        })}
      </FlexOnly>
      <ModalFlex>
        <ModalFlex gap="20px">
          <SubjectOutlined
            sx={{
              paddingTop: "10px",
            }}
          />
          <ModalFlex flexDirection={"column"}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Description
            </Typography>

            {state ? (
              <FlexOnly flexDirection="column" gap="10px">
                <TextAreaForDesc
                  placeholder={
                    Boolean(descText)
                      ? descText
                      : Boolean(subContentId.cardDescription)
                      ? subContentId.cardDescription
                      : "Add a more description for card title"
                  }
                  autoFocus
                  onChange={(el) => [setDescText(el.target.value)]}
                />
                <FlexOnly gap="10px">
                  <Button
                    variant="contained"
                    onClick={() => {
                      // dispatch(darkFilter());
                      setState(!state);
                      addDescToLS();
                    }}
                  >
                    Save
                  </Button>
                  <TransparentButton
                    variant="contained"
                    onClick={() => dispatch(darkFilter())}
                  >
                    Cancel
                  </TransparentButton>
                </FlexOnly>
              </FlexOnly>
            ) : (
              <AddDesPaper onClick={() => setState(!state)}>
                <Typography
                  sx={{
                    padding: "8px 12px",
                    fontSize: "14px",
                  }}
                >
                  {Boolean(descText)
                    ? descText
                    : Boolean(subContentId.cardDescription)
                    ? subContentId.cardDescription
                    : "Add a more description for card title"}
                </Typography>
              </AddDesPaper>
            )}
          </ModalFlex>
          <AddOptions />
        </ModalFlex>
      </ModalFlex>
    </ModalContentBox>
  );
}

export default ModalContents;

{
  // <FlexOnly flexDirection={"column"}>
  //   <Typography fontWeight={"bold"}>Priority</Typography>
  //   <PriorityLabel
  //     sx={{
  //       backgroundColor:
  //         element.priority === "Urgent"
  //           ? "red"
  //           : element.priority === "Medium"
  //           ? "orange"
  //           : "green",
  //       "&:hover": {
  //         backgroundColor:
  //           element.priority === "Urgent"
  //             ? "red"
  //             : element.priority === "Medium"
  //             ? "orange"
  //             : "green",
  //         opacity: "0.7",
  //       },
  //     }}
  //   >
  //     {element.priority}
  //   </PriorityLabel>
  // </FlexOnly>;
}

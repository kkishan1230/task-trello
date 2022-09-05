import {
  Close,
  RemoveRedEyeOutlined,
  SubjectOutlined,
  VideoLabelOutlined,
} from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkFilter } from "../../allStates/SliceActions";
import AddOptions from "./AddOptions";
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
  // const dispatch = useDispatch();

  // Selectors

  const datafromClick = useSelector((state) => {
    return state.inputStates.dataFromClick;
  });

  const contentsId = useSelector((state) => {
    return state.inputStates.contentId;
  });

  const subContentId = useSelector((state) => {
    return state.inputStates.subContentId;
  });

  const dataLocal = useSelector((state) => {
    return state.inputStates.dataLocal;
  });
  // Functions

  const addDescToLS = () => {
    var x = JSON.parse(localStorage.getItem("Titles"));
    if (
      Boolean(
        x[contentsId - 1].addCardTitles[subContentId - 1].TitleDescription
      )
    ) {
      x[contentsId - 1].addCardTitles[subContentId - 1].TitleDescription =
        descText;
    } else {
      x[contentsId - 1].addCardTitles[subContentId - 1]["TitleDescription"] =
        descText;
    }
    localStorage.setItem("Titles", JSON.stringify(x));
  };

  // All states
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const [descText, setDescText] = useState(null);

  var LabelPriorityIndicator =
    dataLocal[contentsId - 1].addCardTitles[subContentId - 1].priority;

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
        {Boolean(
          dataLocal[contentsId - 1].addCardTitles[subContentId - 1].members
        ) && (
          <FlexOnly flexDirection={"column"}>
            <Typography fontWeight={"bold"}>Members</Typography>
            <FlexOnly gap="5px ">
              {dataLocal[contentsId - 1].addCardTitles[subContentId - 1].members
                .length > 0 &&
                dataLocal[contentsId - 1].addCardTitles[
                  subContentId - 1
                ].members.map((mem) => {
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
          </FlexOnly>
        )}
        {Boolean(
          dataLocal[contentsId - 1].addCardTitles[subContentId - 1].dueDate
        ) && (
          <FlexOnly flexDirection={"column"}>
            <Typography fontWeight={"bold"}>Due Date</Typography>
            <DeadlineButton>
              {
                dataLocal[contentsId - 1].addCardTitles[subContentId - 1]
                  .dueDate
              }
            </DeadlineButton>
          </FlexOnly>
        )}

        {Boolean(
          dataLocal[contentsId - 1].addCardTitles[subContentId - 1].priority
        ) && (
          <FlexOnly flexDirection={"column"}>
            <Typography fontWeight={"bold"}>Priority</Typography>
            <PriorityLabel
              sx={{
                backgroundColor:
                  LabelPriorityIndicator === "Urgent"
                    ? "red"
                    : LabelPriorityIndicator === "Medium"
                    ? "orange"
                    : "green",
                "&:hover": {
                  backgroundColor:
                    LabelPriorityIndicator === "Urgent"
                      ? "red"
                      : LabelPriorityIndicator === "Medium"
                      ? "orange"
                      : "green",
                  opacity: "0.7",
                },
              }}
            >
              {
                dataLocal[contentsId - 1].addCardTitles[subContentId - 1]
                  .priority
              }
            </PriorityLabel>
          </FlexOnly>
        )}
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
                    Boolean(
                      dataLocal[contentsId - 1].addCardTitles[subContentId - 1]
                        .TitleDescription
                    )
                      ? dataLocal[contentsId - 1].addCardTitles[
                          subContentId - 1
                        ].TitleDescription
                      : "Add a more description for the card title..."
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
                    : Boolean(
                        dataLocal[contentsId - 1].addCardTitles[
                          subContentId - 1
                        ].TitleDescription
                      )
                    ? dataLocal[contentsId - 1].addCardTitles[subContentId - 1]
                        .TitleDescription
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

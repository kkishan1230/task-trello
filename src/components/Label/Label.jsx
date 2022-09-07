import { Check } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { color, height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openLabelModal,
  contentId,
  subContentId,
  dataLocal,
} from "../../allStates/SliceActions";
import { FlexOnly } from "../ModalContents/ModalContentsStyles";
import { LabelButton } from "./LabelStyle";

function Label() {
  // Functions
  const addLabel = (e) => {
    var x = JSON.parse(localStorage.getItem("Titles"));
    x[contentId - 1].addCardTitles.forEach((element) => {
      if (element.priority !== undefined && element.id === subContentId.id) {
        element.priority = e;
        console.log(subContentId.id);
      } else if (element.id === subContentId.id) {
        element["priority"] = e;
      }
    });

    dispatch(dataLocal(x));
    localStorage.setItem("Titles", JSON.stringify(x));
    dispatch(openLabelModal());
  };

  // actions
  const dispatch = useDispatch();
  // selectors
  const contentId = useSelector((state) => {
    return state.inputStates.contentId;
  });
  const subContentId = useSelector((state) => {
    return state.inputStates.subContentId;
  });
  // states
  const [buttonIcons, setButtonIcons] = useState({
    red: false,
    orange: false,
    green: false,
  });
  return (
    <Paper
      sx={{
        width: "300px",
        height: "fit-content",
        padding: "20px 40px",
      }}
    >
      <FlexOnly flexDirection={"column"} gap="10px">
        <LabelButton
          onClick={(state) => {
            setButtonIcons({
              orange: false,
              red: true,
              green: false,
            });
            addLabel("Urgent");
          }}
          endIcon={buttonIcons.red && <Check />}
          variant="contained"
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "red",
              opacity: "0.7",
            },
          }}
        >
          Urgent
        </LabelButton>
        <LabelButton
          onClick={() => {
            setButtonIcons({ orange: true, red: false, green: false });
            addLabel("Medium");
          }}
          endIcon={buttonIcons.orange && <Check />}
          variant="contained"
          sx={{
            backgroundColor: "orange",
            "&:hover": {
              backgroundColor: "orange",
              opacity: "0.7",
            },
          }}
        >
          Medium
        </LabelButton>
        <LabelButton
          onClick={() => {
            setButtonIcons({ orange: false, red: false, green: true });
            addLabel("Easy");
          }}
          endIcon={buttonIcons.green && <Check />}
          variant="contained"
          sx={{
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "green",
              opacity: "0.7",
            },
          }}
        >
          Easy
        </LabelButton>
      </FlexOnly>
    </Paper>
  );
}

export default Label;

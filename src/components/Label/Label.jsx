import { Check } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { color, height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openLabelModal } from "../../allStates/SliceActions";
import { FlexOnly } from "../ModalContents/ModalContentsStyles";
import { LabelButton } from "./LabelStyle";

function Label() {
  const dispatch = useDispatch();
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
            setButtonIcons({ ...buttonIcons, red: !buttonIcons.red });
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
            setButtonIcons({ ...buttonIcons, orange: !buttonIcons.orange });
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
            setButtonIcons({ ...buttonIcons, green: !buttonIcons.green });
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
        <LabelButton
          onClick={() => {
            dispatch(openLabelModal());
          }}
          variant="contained"
          sx={{
            justifyContent: "center",
          }}
        >
          Save
        </LabelButton>
      </FlexOnly>
    </Paper>
  );
}

export default Label;

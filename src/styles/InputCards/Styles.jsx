import { Button, TextareaAutosize, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CardContainer = styled(Box)({
  width: "250px",
  height: "fit-content",
  borderRadius: 5,
  backgroundColor: "rgb(208, 208, 208)",
  padding: 5,
});

export const AddCardButton = styled(Button)({
  backgroundColor: "rgba(0,0,0,0.2)",
  padding: "5px 100px 5px 20px",
  "&:hover": {
    backgroundColor: "rgba(150,150,150,1)",
  },
});

export const TaskNameBox = styled(Box)({
  padding: "10px 15px",
  fontSize: "13px",
});

export const TextStyle = styled(TextField)({
  "&:hover fieldset": {
    borderColor: "transparent",
  },
});

export const CardContainerFlex = styled(Box)({
  display: "flex",
  gap: 20,
});

export const AbsoluteContainer = styled(Box)({
  position: "absolute",
});

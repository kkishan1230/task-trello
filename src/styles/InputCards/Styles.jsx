import { Button, Paper, TextareaAutosize, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CardContainer = styled(Box)({
  width: "250px",
  height: "fit-content",
  borderRadius: 5,
  backgroundColor: "rgb(208, 208, 208)",
  padding: " 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "space-between",
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

export const PaperCard = styled(Paper)({
  padding: "12px 5px",
  margin: 5,
  position: "relative",
});

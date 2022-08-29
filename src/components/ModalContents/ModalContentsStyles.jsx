import {
  Button,
  Paper,
  styled,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

export const ModalContentBox = styled(Box)({
  backgroundColor: "#F4F5F7",
  position: "relative",
  width: "fit-content",
  paddingInline: 10,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 768,
  height: 600,
});

export const ModalFlex = styled(Box)({
  display: "flex",
  padding: 5,
  justifyContent: "space-between",
});

export const AddDesPaper = styled(Paper)({
  // padding: "10px",
  height: "56px",
  width: "512px",
  justifyContent: "flex-start",
  backgroundColor: "rgba(225,228,233,0.5)",
  "&:hover": {
    backgroundColor: "rgba(225,228,233,1)",
  },
});

export const FlexOnly = styled(Box)({
  display: "flex",
});

export const TextAreaForDesc = styled(TextareaAutosize)({
  maxHeight: "92px",
  minHeight: "92px",
  width: "488px",
  resize: "none",
});

export const TransparentButton = styled(Button)({
  border: "none",
  backgroundColor: "transparent",
  color: "black",
  "&:hover": {
    backgroundColor: "rgba(225,228,233,0.7)",
  },
});

export const OptionsButtons = styled(Button)({
  color: "black",
  textAlign: "left",
  justifyContent: "flex-start",
});

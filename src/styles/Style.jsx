import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

export const AddButton = styled(Button)({
  backgroundColor: "rgba(250,250,250,0.2)",
  padding: "5px 120px 5px 20px",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "rgba(250,250,250,0.3)",
  },
  color: "white",
});

export const InputCardStyle = styled(Box)({
  width: "fit-content",
  padding: "7px",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "5px",
  position: "absolute",
  top: "0px",
});

export const FlexContainer = styled(Box)({
  display: "flex",
  marginTop: "80px",
  gap: 20,
  paddingLeft: "50px",
});

export const Container = styled(Box)({
  position: "relative",
  display: "flex",
  paddingRight: "50px",
});

export const TiTleContainer = styled(Box)({
  position: "relative",
  width: "fit-content",
  height: "fit-content",

  display: "flex",
  flexDirection: "column",
  borderRadius: 5,
});

// const ModalStyle =

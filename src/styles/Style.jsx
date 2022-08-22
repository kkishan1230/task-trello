import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const AddButton = styled(Button)({
  backgroundColor: "rgba(250,250,250,0.2)",
  padding: 0,
  alignItems: "left",
  padding: "5px 120px 5px 20px",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "rgba(250,250,250,0.3)",
  },
  marginTop: "60px",
  color: "white",
});

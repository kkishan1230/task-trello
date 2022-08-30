import { Button, styled } from "@mui/material";

export const LabelButton = styled(Button)({
  paddin: "5px 150px 5px 5px",
  cursor: "pointer",
  fontWeight: "bold",
  justifyContent: "space-between",
  "&:hover": {
    opacity: 1,
  },
});

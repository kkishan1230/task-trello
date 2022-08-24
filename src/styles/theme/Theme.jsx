import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export const themeForTextField = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  },
});

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    warning: {
      main: "rgb(255,0,0)",
    },
  },
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

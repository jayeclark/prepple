import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b5cc5e",
      contrastText: "#fff",
    },
    common: {
      black: "#030027",
    },
    secondary: {
      main: "#009EB0",
      contrastText: "#fff",
    },
    info: {
      main: "#fff",
      contrastText: "#003B53",
    },
    background: {
      paper: "#b5cc5e",
      default: "#fdfff6",
    }
  },
  components: {
    MuiButton: {
      variants: [
        { props: { variant: 'google' },
          style: {
            backgroundColor: "#e6e6e6",
            color: "#1a1a1a",
            padding: 16
          }
        },
        { props: { variant: 'github' },
          style: {
            backgroundColor: "rgb(34, 34, 34)",
            color: "#fff",
            padding: 16,
            '&:hover': {
              background: "rgba(34, 34, 34, 0.8)",
            },
            '&:disabled': {
              opacity: 0.6,
              color: "#fff",
           },
          }
        }
      ]
    }
  }
})

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    google: true;
    github: true;
  }
}
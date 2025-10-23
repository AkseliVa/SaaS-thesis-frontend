import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ab0aea85",
      light: "#4DB6AC",
      dark: "#00695C",
      contrastText: "#ffffff",
    },
    secondary: {
        main: "#0288D1",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#010810ff",
      secondary: "#5F6C7B",
    },
    success: {
      main: "#43A047",
    },
    error: {
      main: "#E53935",
    },
    warning: {
      main: "#FB8C00",
    },
    info: {
      main: "#039BE5",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontWeight: 900,
        fontSize: "3rem",
        color: "#fbfdffff",
        display: "block",
        marginBlockStart: "0.67em",
        marginBlockEnd: "0.67em"

    },
    h2: {
        fontWeight: 600,
        fontSize: "1.5rem",
        color: "#eaf0f8ff",
        display: "block",
        marginBlockStart: "0.67em",
        marginBlockEnd: "0.67em"
    },
    h3: {
        fontWeight: 400,
        fontSize: "1.25rem",
    },
    body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#333",
    },
    button: {
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: 0.3,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #e66465, #9198e5)",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
            borderRadius: 20,
            padding: "0.5rem",
            boxShadow:
            "0px 4px 12px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.03)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow:
              "0px 4px 10px rgba(0, 137, 123, 0.3)",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow:
            "0px 0px 40px rgba(0, 0, 0, 0.1), 10px 10px 10px rgba(0, 0, 0, 0.03)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;

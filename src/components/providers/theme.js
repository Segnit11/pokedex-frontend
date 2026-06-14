import { createTheme } from "@mui/material/styles";

// Builds the MUI theme for a given color mode. Pokedex red as the accent.
export const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#DC0A2D" },
      secondary: { main: "#3B4CCA" },
      ...(mode === "light"
        ? {
            background: { default: "#f2f4f7", paper: "#ffffff" },
          }
        : {
            background: { default: "#0f1115", paper: "#181b22" },
          }),
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: "var(--font-inter), Roboto, sans-serif",
      h4: { fontWeight: 800 },
      h5: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "transform .18s ease, box-shadow .18s ease",
          },
        },
      },
    },
  });

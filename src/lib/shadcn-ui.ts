import { createTheme } from "@shadow-ui/core";

export const theme = createTheme({
  colors: {
    primary: {
      DEFAULT: "#3b82f6",
      hover: "#1e40af",
    },
    secondary: {
      DEFAULT: "#6b7280",
      hover: "#4b5563",
    },
    background: {
      DEFAULT: "#f3f4f6",
      dark: "#1f2937",
    },
    text: {
      DEFAULT: "#1f2937",
      light: "#6b7280",
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "700",
      lineHeight: "1.2",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: "600",
      lineHeight: "1.3",
    },
    body: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
  },
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
});

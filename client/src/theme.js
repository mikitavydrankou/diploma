import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a1a1a",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3b82f6",
            light: "#93c5fd",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#4b5563",
        },
        error: {
            main: "#ef4444",
        },
        success: {
            main: "#22c55e",
        },
    },
    typography: {
        fontFamily: ["Inter", "system-ui", "-apple-system", "sans-serif"].join(
            ","
        ),
        button: {
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: "0.025em",
        },
        h5: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    minHeight: "100vh",
                    overflowX: "hidden",
                    display: "flex",
                    flexDirection: "column",
                },
                "#root": {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    },
                },
            },
        },
    },
});

export default theme;

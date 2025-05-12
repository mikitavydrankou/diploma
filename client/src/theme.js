import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ff3c3c", // яркий красный для кнопок, ссылок и т.п.
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#9a1d1d", // более глубокий красный для вторичных элементов
            light: "#ff6b6b", // акценты при наведении
        },
        background: {
            default: "#121212", // фон всего приложения
            paper: "#1e1e1e", // карточки и модальные окна
        },
        text: {
            primary: "#f1f1f1",
            secondary: "#aaaaaa",
        },
        error: {
            main: "#ff4d4f", // можно оставить таким
        },
        success: {
            main: "#22c55e",
        },
        warning: {
            main: "#facc15",
        },
        info: {
            main: "#3b82f6",
        },
    },
    typography: {
        fontFamily: ["Inter", "system-ui", "-apple-system", "sans-serif"].join(
            ","
        ),
        button: {
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: "0.05em",
        },
        h5: {
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    minHeight: "100vh",
                    overflowX: "hidden",
                    backgroundColor: "#121212",
                    color: "#f1f1f1",
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
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #ff3c3c, #9a1d1d)",
                    color: "#fff",
                    "&:hover": {
                        background: "linear-gradient(135deg, #ff6b6b, #b22222)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1e1e1e",
                    color: "#f1f1f1",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 12px rgba(255, 60, 60, 0.2)",
                    },
                },
            },
        },
    },
});

export default theme;

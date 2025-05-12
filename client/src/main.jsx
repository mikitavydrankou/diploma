import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { queryClient } from "./api/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <HashRouter>
                <StrictMode>
                    <App />
                </StrictMode>
            </HashRouter>
        </ThemeProvider>
    </QueryClientProvider>
);

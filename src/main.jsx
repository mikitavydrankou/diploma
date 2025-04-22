import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { queryClient } from "./api/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <StrictMode>
                <App />
            </StrictMode>
        </Router>
    </QueryClientProvider>
);

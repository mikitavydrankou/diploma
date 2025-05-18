import { CssBaseline, Container, Box } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/Homepage";
import SigninPage from "./pages/authPages/SigninPage";
import SignupPage from "./pages/authPages/SignupPage";
import TopNavbar from "./components/navbars/TopNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";

import OfferPage from "./pages/OfferPage";
import { CreateOfferPage } from "./pages/CreateOfferPage";
import { useAuthStore } from "./store/authStore";
import InfoPage from "./pages/InfoPage";

const MainLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
                color: "text.primary",
                background: `url('/topography.svg')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <TopNavbar />
            <Container
                component="main"
                sx={{
                    flex: 1,
                    py: 4,
                    mt: { xs: "56px", sm: "64px" },
                    mb: { xs: "56px", sm: "64px" },
                    px: { xs: 2, sm: 3 },
                }}
            >
                <Outlet />
            </Container>
            <BottomNavbar />
        </Box>
    );
};

function App() {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <>
            <CssBaseline />
            <Routes>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/offer/:id" element={<OfferPage />} />

                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<InfoPage />} />
                    <Route path="/offer/create" element={<CreateOfferPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;

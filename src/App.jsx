import "./App.css";
import styles from "./styles/Layout.module.css";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SigninPage from "./pages/authPages/SigninPage";
import SignupPage from "./pages/authPages/SignupPage";
import TopNavbar from "./components/navbars/TopNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import ProfilePage from "./pages/ProfilePage";
import OfferPage from "./pages/OfferPage";
import CreateOfferPage from "./pages/CreateOfferPage";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const MainLayout = () => {
    return (
        <div className={styles.appContainer}>
            <TopNavbar />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <BottomNavbar />
        </div>
    );
};

function App() {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/offer/:id" element={<OfferPage />} />
            <Route path="/offer/create" element={<CreateOfferPage />} />
            {/* <Route path="/createoffer" element={<CreateOfferPage />} />
            <Route path="/offer/:offerId" element={<OfferPage />} /> */}

            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}

export default App;

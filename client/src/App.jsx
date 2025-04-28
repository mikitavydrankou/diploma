import styles from "./Layout.module.css";
import { Routes, Route, Outlet } from "react-router-dom";

import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
// import PrivateRoute from "./pages/PrivateRoute";
// import PrivatePage from "./pages/PrivatePage";
import TopNavbar from "./components/navbars/TopNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import CreateOfferPage from "./pages/CreateOfferPage";
import OfferPage from "./pages/OfferPage";

const MainLayout = () => {
  return (
    <div className={styles.appContainer}>
      <TopNavbar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/createoffer" element={<CreateOfferPage />} />
      <Route path="/offer/:offerId" element={<OfferPage />} />

      {/* Все остальные страницы с layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />

        {/* Будущие защищенные маршруты */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/private" element={<PrivatePage />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

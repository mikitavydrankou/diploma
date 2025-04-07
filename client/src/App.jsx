import styles from "./Layout.module.css";
import { Routes, Route, Outlet } from "react-router-dom";

import Register from "./components/forms/Register";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
// import PrivateRoute from "./pages/PrivateRoute";
// import PrivatePage from "./pages/PrivatePage";
import TopNavbar from "./components/navbars/TopNavbar";
import BottomNavbar from "./components/navbars/BottomNavbar";
import CreateOfferPage from "./pages/CreateOfferPage";

const MainLayout = () => {
  return (
    <div className={styles.appContainer}>
      <TopNavbar />
      <main className={styles.content}>
        <Outlet /> {/* Здесь будет рендериться контент страниц */}
      </main>
      <BottomNavbar />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      {/* Страницы без layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Все остальные страницы с layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/CreateOfferPage" element={<CreateOfferPage />} />

        {/* Будущие защищенные маршруты */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/private" element={<PrivatePage />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import { useAuthStore } from "../../store/authStore";

const BottomNavbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const user = useAuthStore((s) => s.user);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return (
            <div className={styles.bottomNavbar}>
                <Link to="/signin" className={styles.navButton}>
                    Signin
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.bottomNavbar}>
            <Link to="/profile" className={styles.navItem}>
                Ja
            </Link>
            <Link to="/" className={styles.navItem}>
                Oferty
            </Link>

            <button className={styles.menuItem} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default BottomNavbar;

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";
import styles from "./styles/Navbar.module.css";

const BottomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (!token) {
    return (
      <div className={styles.bottomNavbar}>
        <Link to="/login" className={styles.navButton}>
          Login
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
      <div className={styles.dropdown}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          - - -
        </button>

        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.menuItem} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;

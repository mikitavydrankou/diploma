// BottomNavbar.jsx
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";
import styles from "./Navbar.module.css";

const BottomNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = React.useRef(null);
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Dropdown = ({ open, trigger, menu }) => {
    return (
      <div className={styles.dropdown} ref={dropdownRef}>
        {trigger}
        {open && (
          <div className={styles.dropdownMenu}>
            {menu.map((menuItem, index) => (
              <div key={index} className={styles.menuItem}>
                {menuItem}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!token) {
    return (
      <div className={styles.BottomNavbar}>
        <Link to="/login" className={styles.loginButton}>
          Войти
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.bottomNavbar}>
      <Link to="/profile" className={styles.navItem}>
        Профиль
      </Link>
      <Link to="/" className={styles.navItem}>
        Главная
      </Link>
      <Dropdown
        open={open}
        trigger={
          <button
            className={styles.menuButton}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            Меню
          </button>
        }
        menu={[
          <button
            key="logout"
            className={styles.menuItem}
            onClick={handleLogout}
          >
            Выйти
          </button>,
        ]}
      />
    </div>
  );
};

export default BottomNavbar;

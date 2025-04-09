import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Buttons.module.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`${styles.button} ${styles.secondaryButton} ${styles.withIcon}`}
    >
      <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
      Выйти
    </button>
  );
};

export default LogoutButton;

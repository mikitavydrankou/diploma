import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Вход</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nickname"
            required
          />
          <input
            type="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwd"
            required
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Login..." : "Login"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;

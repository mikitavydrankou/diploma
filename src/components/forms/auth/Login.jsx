import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

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
        <h2 className={styles.authTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.authInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nickname"
            required
          />
          <input
            type="password"
            className={styles.authInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwd"
            required
          />
          <button
            type="submit"
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? "Login..." : "Login"}
          </button>
          {error && <div className={styles.authError}>{error}</div>}
        </form>

        <Link to="/register" className={styles.registerLink}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;

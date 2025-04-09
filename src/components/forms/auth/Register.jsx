import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, link))
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.authTitle}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.authInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            className={styles.authInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className={styles.authInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="text"
            className={styles.authInput}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link"
          />
          <button
            type="submit"
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? "Registration..." : "Register"}
          </button>
          {error && <div className={styles.authError}>{error}</div>}
        </form>
        <Link to="/login" className={styles.loginLink}>
          Login
        </Link>
      </div>
    </div>
  );
};
export default Register;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

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
        <h2 className={styles.title}>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="text"
            className={styles.inputField}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link"
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Registration..." : "Register"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;

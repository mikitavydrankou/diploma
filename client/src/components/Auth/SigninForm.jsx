import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import styles from "./styles/Auth.module.css";

const SigninForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signin, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(username, password);
            navigate("/");
        } catch (err) {
            console.error("Error signing in:", err);
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.formContainer}>
                <h2 className={styles.authTitle}>Sign in</h2>
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
                        type="password"
                        className={styles.authInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
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
                <Link to="/signup" className={styles.registerLink}>
                    Sign up
                </Link>
            </div>
            <Link to="/" className={styles.registerLink}>
                Home
            </Link>
        </div>
    );
};

export default SigninForm;

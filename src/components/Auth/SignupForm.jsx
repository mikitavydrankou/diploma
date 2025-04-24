import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import styles from "./styles/Auth.module.css";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const { signup, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, link, password);
            navigate("/");
        } catch (err) {
            console.error("Error signing up:", err);
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
                        placeholder="Nickname"
                        required
                    />
                    <input
                        type="text"
                        className={styles.authInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required
                    />
                    <input
                        type="text"
                        className={styles.authInput}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="link"
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
                        {isLoading ? "Signup..." : "signup"}
                    </button>
                    {error && <div className={styles.authError}>{error}</div>}
                </form>
                <Link to="/signin" className={styles.registerLink}>
                    Sign in
                </Link>
            </div>
            <Link to="/" className={styles.registerLink}>
                Home
            </Link>
        </div>
    );
};

export default SignupForm;

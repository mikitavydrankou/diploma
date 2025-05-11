import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
    Stack,
    CircularProgress,
    Alert,
} from "@mui/material";

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
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Welcome Back
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{ py: 1.5 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                    Don't have an account?{" "}
                    <MuiLink component={Link} to="/signup" underline="hover">
                        Sign Up
                    </MuiLink>
                </Typography>
                <MuiLink
                    component={Link}
                    to="/"
                    underline="hover"
                    sx={{ mt: 2, display: "block" }}
                >
                    Back to Home
                </MuiLink>
            </Box>
        </Box>
    );
};

export default SigninForm;

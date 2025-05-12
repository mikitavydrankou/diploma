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

//TODO Подтверждение пароля
//TODO Кнопка перехода в fb

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, link, password);
            navigate("/");
        } catch (err) {
            console.error("Error signing up:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Załóż konto!
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Przydomek"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Link do strony profilu Facebook"
                        variant="outlined"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        helperText="Przykład: https://www.facebook.com/profile.php?id=1000812212993440"
                        required
                    />

                    <Button
                        href={"https://www.facebook.com/profile.php"}
                        target="_blank"
                        variant="outlined"
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        Tutaj znajdziesz swój link
                    </Button>

                    <TextField
                        fullWidth
                        label="Hasło"
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
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Załóż konto"
                        )}
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                    Masz konto?{" "}
                    <MuiLink component={Link} to="/signin" underline="hover">
                        Załoguj się tutaj!
                    </MuiLink>
                </Typography>
                <MuiLink
                    component={Link}
                    to="/"
                    underline="hover"
                    sx={{ mt: 2, display: "block" }}
                >
                    Wróc na stronę główną
                </MuiLink>
            </Box>
        </Box>
    );
};

export default SignupForm;

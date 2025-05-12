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
    useMediaQuery,
    useTheme,
} from "@mui/material";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
            <Typography variant="h5" component="h1" gutterBottom align="center">
                Załóż konto!
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Nickname"
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

                    {isDesktop ? (
                        <Button
                            href={"https://www.facebook.com/profile.php"}
                            target="_blank"
                            variant="outlined"
                            sx={{ mt: 1 }}
                            fullWidth
                        >
                            Tutaj znajdziesz swój link
                        </Button>
                    ) : (
                        <Typography
                            variant="body2"
                            align="left"
                            sx={{
                                fontSize: "0.85rem",
                                color: "text.secondary",

                                p: 1,
                                borderRadius: 2,
                            }}
                        >
                            <strong>Jak znaleźć link do profilu:</strong>
                            <br />
                            1. Otwórz aplikację Facebook
                            <br />
                            2. Przejdź do swojego profilu
                            <br />
                            3. Kliknij trzy kropki obok „Edytuj profil”
                            <br />
                            4. Wybierz „Kopiuj link do profilu” na dole
                            <br />
                            5. Nacisnij "„Kopiuj link" w oknie, które się
                            otworzy
                            <br />
                            6. Wklej tutaj
                        </Typography>
                    )}

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

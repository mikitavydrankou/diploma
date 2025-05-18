import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const SigninForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signin, isLoading, error } = useAuthStore();
    // const [openInfo, setOpenInfo] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(username, password);
            navigate("/");
        } catch (err) {
            console.error("Error signingin:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
            {/* <Typography variant="h4" component="h1" gutterBottom align="center">
                <MuiLink
                    component="button"
                    variant="h5"
                    onClick={() => setOpenInfo(true)}
                    sx={{ cursor: "pointer" }}
                >
                    Co to jest?
                </MuiLink>
            </Typography> */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        height: 80,
                        width: 240,
                        backgroundImage: "url(/logo.png)",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                />
            </Box>

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
                        label="Hasło"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <Alert severity="error">
                            {error.message || JSON.stringify(error)}
                        </Alert>
                    )}

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
                            "Zaloguj się"
                        )}
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                    Nie masz konta?{" "}
                    <MuiLink
                        component={RouterLink}
                        to="/signup"
                        underline="hover"
                    >
                        Załóż tutaj!
                    </MuiLink>
                </Typography>
                <MuiLink
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    sx={{ mt: 2, display: "block" }}
                >
                    Wróc na główną
                </MuiLink>
            </Box>

            {/* <Dialog
                open={openInfo}
                onClose={() => setOpenInfo(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Co to jest?</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" gutterBottom>
                        Kortowo Ninja to bezpłatna platforma wymiany rzeczy
                        między studentami Uniwersytetu Warmińsko-Mazurskiego w
                        Olsztynie, szczególnie mieszkającymi w akademikach
                        Kortowa. Umożliwia studentom tworzenie i publikowanie
                        ofert (przedmiotów, usług lub propozycji wymiany),
                        przeglądanie i wyszukiwanie ogłoszeń innych użytkowników
                        oraz bezpośredni kontakt przez Facebooka — bez
                        pośredników.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenInfo(false)}>Zamknij</Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
};

export default SigninForm;

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

export const InfoButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<InfoIcon />}
                onClick={() => setOpen(true)}
                sx={{
                    width: "100%",
                    py: 0.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 400,
                    transition: "all 0.3s",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                Przeczytaj co to jest!
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Czym jest Kortowo Ninja?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography gutterBottom>
                            <strong>Kortowo Ninja</strong> to studencka
                            platforma wymiany wszystkiego — bez formalności.
                        </Typography>

                        <ul
                            style={{
                                paddingLeft: "1.2em",
                                marginTop: 8,
                                marginBottom: 8,
                            }}
                        >
                            <li>Przeglądaj ogłoszenia innych</li>
                            <li>Dodaj ofertę (przedmiot, usługę, cokolwiek)</li>
                            <li>Dogaduj się przez Facebooka</li>
                        </ul>

                        <Typography
                            variant="body2"
                            sx={{
                                fontStyle: "italic",
                                color: "text.secondary",
                            }}
                        >
                            „Książka za kawę, pomoc w nauce za pizzę, krzesło za
                            roślinę…”
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Po zalogowaniu kliknij „Info” na dole, aby
                            dowiedzieć się więcej.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                        variant="contained"
                    >
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

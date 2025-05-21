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
                        Ninja to platforma wymiany czegokolwiek dla studentów na
                        Kortowo:
                        <br />
                        <br />
                        • Tworzenie i publikowanie ofert (przedmiotów, usług lub
                        propozycji wymiany)
                        <br />
                        <Typography
                            component="div"
                            variant="body2"
                            sx={{
                                fontStyle: "italic",
                                color: "text.secondary",
                                ml: 2,
                                mt: 0.5,
                            }}
                        >
                            „Co masz do oddania? Czego szukasz? Dogadajcie się!”
                            <br />
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: "0.9rem",
                                    display: "block",
                                    lineHeight: 1.3,
                                }}
                            >
                                (Książka za kawę, pomoc w nauce za pizzę, stare
                                krzesło za roślinę, piwko za chipsy...)
                            </Typography>
                        </Typography>
                        <br />
                        • Przeglądaj oferty innych
                        <br />• Pisz przez Facebooka — bez formalności
                        <br />
                        <br />
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "0.9rem",
                                display: "block",
                                lineHeight: 1.3,
                            }}
                        >
                            Po zalogowaniu znajdziesz przycisk „Info”, aby
                            zapoznać się z tym, jak korzystać z platformy.
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

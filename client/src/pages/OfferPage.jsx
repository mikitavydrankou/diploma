import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useOfferById } from "../api/offerQueries";
import BackButton from "../components/buttons/BackButton";
import { DeleteButton } from "../components/buttons/DeleteOfferButton";
import { useAuthStore } from "../store/authStore";
import {
    Container,
    Box,
    Typography,
    Chip,
    Divider,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";

const OfferPage = () => {
    const { id } = useParams();
    const { data: offer, isLoading, error } = useOfferById(id);
    const { user } = useAuthStore();

    const [openTerms, setOpenTerms] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleAcceptTerms = () => {
        setAcceptedTerms(true);
        setOpenTerms(false);
    };

    if (isLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );

    if (error) return <p>Błąd: {error.message}</p>;
    if (!offer) return <p>Oferta nie została znaleziona</p>;

    const isOwner = user?.id === offer.user.id;
    const isAdminOrModerator =
        user?.role === "admin" || user?.role === "moderator";
    const canDelete = isOwner || isAdminOrModerator;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Szczegóły oferty
                </Typography>
            </Box>

            <Typography
                variant="body2"
                sx={{ fontSize: "0.85rem", color: "text.secondary", mb: 0 }}
            >
                Przedmiot oferty:
            </Typography>

            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 600, color: "primary.main" }}
            >
                {offer.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Chip
                    icon={<PlaceIcon />}
                    label={`Lokalizacja: ${offer.place}`}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                />
                <Chip
                    icon={<PersonIcon />}
                    label={`Użytkownik: ${offer.user?.username}`}
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    Opis oferty
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        overflowWrap: "anywhere",
                    }}
                >
                    {offer.description || "Brak opisu"}
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    Proponowana wymiana
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                        fontWeight: 400,
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        overflowWrap: "anywhere",
                    }}
                >
                    {offer.counter_offer || "Nie podano preferencji wymiany"}
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                Skontaktuj się z autorem oferty:
            </Typography>

            {!acceptedTerms ? (
                <Button
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    onClick={() => setOpenTerms(true)}
                    sx={{
                        width: "100%",
                        py: 1.5,
                        borderRadius: 1,
                        fontWeight: 500,
                        textTransform: "none",
                        mb: 3,
                    }}
                >
                    Zaakceptuj regulamin, aby zobaczyć link użytkownika
                </Button>
            ) : (
                <Button
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    href={offer.user?.link}
                    target="_blank"
                    sx={{
                        width: "100%",
                        py: 1.5,
                        borderRadius: 1,
                        fontWeight: 500,
                        textTransform: "none",
                        mb: 3,
                    }}
                >
                    Napisz wiadomość na Facebooku
                </Button>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                {canDelete && <DeleteButton offerId={offer.id} />}
                <BackButton />
            </Box>

            <Dialog
                open={openTerms}
                onClose={() => setOpenTerms(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Regulamin Kortowo Ninja</DialogTitle>
                <DialogContent dividers>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Zaktualizowano: 15.05.2025
                    </Typography>

                    <Typography paragraph>
                        Przed skontaktowaniem się z autorem oferty prosimy o
                        uważne zapoznanie się z regulaminem:
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Korzystanie z platformy
                    </Typography>
                    <Typography paragraph>
                        Kortowo Ninja to bezpłatna platforma do wymiany rzeczy
                        między studentami...
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Odpowiedzialność
                    </Typography>

                    <Typography paragraph>
                        Kortowo Ninja udostępnia jedynie narzędzie do
                        zamieszczania ogłoszeń i nie bierze udziału w wymianie
                        przedmiotów między użytkownikami. Wszystkie ustalenia,
                        spotkania i przekazania przedmiotów odbywają się poza
                        platformą — na własną odpowiedzialność użytkowników.
                        Administracja nie ponosi odpowiedzialności za skutki
                        takich interakcji, w tym ewentualne spory, oszustwa lub
                        niewywiązanie się z ustaleń.
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Zakazane treści
                    </Typography>
                    <ul>
                        <li>Alkohol dla osób poniżej 18 roku życia</li>
                        <li>Przemoc, dyskryminacja, spam, oszustwa</li>
                        <li>Nielegalne przedmioty</li>
                        <li>Reklama bez zgody</li>
                    </ul>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={acceptedTerms}
                                onChange={(e) =>
                                    setAcceptedTerms(e.target.checked)
                                }
                            />
                        }
                        label="Akceptuję regulamin Kortowo Ninja"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTerms(false)}>Anuluj</Button>
                    <Button
                        onClick={handleAcceptTerms}
                        disabled={!acceptedTerms}
                        variant="contained"
                    >
                        Akceptuję
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OfferPage;

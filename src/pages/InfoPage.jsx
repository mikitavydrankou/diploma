import {
    Container,
    Box,
    Typography,
    Stack,
    Divider,
    Chip,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useAuthStore } from "../store/authStore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LinkIcon from "@mui/icons-material/Link";
import GavelIcon from "@mui/icons-material/Gavel";
import { getUserCount, getOfferCount } from "../api/featureAPI.js";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";

const InfoPage = () => {
    const { user } = useAuthStore();
    const [userCount, setUserCount] = useState(null);
    const [offerCount, setOfferCount] = useState(null);
    const [termsOpen, setTermsOpen] = useState(false);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [users, offers] = await Promise.all([
                    getUserCount(),
                    getOfferCount(),
                ]);
                setUserCount(users);
                setOfferCount(offers);
            } catch (err) {
                console.error("Failed to fetch counts", err);
            }
        };

        fetchCounts();
    }, []);

    const sectionStyle = {
        p: 4,
        mb: 4,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Заголовок с иконкой */}
            <Box textAlign="center" mb={6}>
                <Chip
                    label="Beta"
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <GroupsIcon fontSize="large" />
                    Witamy w Ninja!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Platforma wymiany
                </Typography>
            </Box>

            {/* Блок пользователя */}
            {user && (
                <Box sx={sectionStyle}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                        👋 Twoje konto
                    </Typography>

                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Nazwa użytkownika
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {user.username}
                            </Typography>
                        </Box>

                        {user.link && (
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Link do profilu
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <LinkIcon fontSize="small" color="action" />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            wordBreak: "break-all",
                                            overflowWrap: "break-word",
                                        }}
                                    >
                                        {user.link}
                                    </Typography>
                                </Stack>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ mt: 2 }}
                                >
                                    <Button
                                        variant="contained"
                                        href={user.link}
                                        target="_blank"
                                        startIcon={<LinkIcon />}
                                        sx={{ borderRadius: 3 }}
                                    >
                                        Sprawdź link
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                user.link
                                            )
                                        }
                                        startIcon={<ContentCopyIcon />} // Исправлено
                                        sx={{ borderRadius: 3 }}
                                    >
                                        Kopiuj
                                    </Button>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </Box>
            )}

            {/* Секция о projekcie */}
            <Box sx={sectionStyle}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <SwapHorizIcon color="primary" /> O projekcie
                </Typography>
                <Typography
                    paragraph
                    sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
                >
                    Ninja to projekt stworzony przez studenta informatyki
                    Uniwersytetu Warmińsko-Mazurskiego. Ma na celu ułatwienie
                    wymiany rzeczy i usług między studentami, zwłaszcza tymi
                    mieszkającymi w akademikach Kortowa.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                    }}
                >
                    {userCount === null ? (
                        <CircularProgress size={24} color="primary" />
                    ) : (
                        <>
                            <PersonIcon color="primary" />
                            <Typography variant="body1" fontWeight={500}>
                                Już {userCount} zarejestrowanych użytkowników!
                            </Typography>
                        </>
                    )}
                </Box>
                <br />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                    }}
                >
                    {offerCount === null ? (
                        <CircularProgress size={24} color="primary" />
                    ) : (
                        <>
                            <AssignmentIcon color="primary" />
                            <Typography variant="body1" fontWeight={500}>
                                Łącznie utworzono {offerCount} ofert!
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>

            {/* Instrukcja korzystania */}
            <Box sx={sectionStyle}>
                <Box
                    sx={{
                        display: "grid",
                        gap: 4,
                        gridTemplateColumns: { md: "repeat(3, 1fr)" },
                    }}
                >
                    {[
                        {
                            title: "1. Dodaj ofertę",
                            content: "Opisz przedmiot i ustaw timer",
                        },
                        {
                            title: "2. Przeglądaj",
                            content: "Znajdź potrzebne przedmioty",
                        },
                        {
                            title: "3. Wymieniaj się",
                            content: "Skontaktuj się przez Facebook",
                        },
                    ].map((step) => (
                        <Box key={step.title} sx={{ textAlign: "center" }}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: "primary.main",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                {step.title[0]}
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {step.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {step.content}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Kontakt */}
            <Box sx={sectionStyle}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <ContactSupportIcon color="primary" /> Kontakt
                </Typography>

                <Stack spacing={3}>
                    <Button
                        variant="contained"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd2maOG4HMX7UiaBmdkkTLLOBJ4-8bPbeiSVFOQ7cUiYk6C6Q/viewform"
                        target="_blank"
                        startIcon={<EmailIcon />}
                        sx={{ py: 1.5, borderRadius: 3 }}
                    >
                        Formularz kontaktowy
                    </Button>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "action.hover",
                        }}
                    >
                        <EmailIcon color="primary" />
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Email bezpośredni:
                            </Typography>
                            <Typography variant="body1">
                                <a
                                    href="mailto:hausmojo@outlook.com"
                                    style={{ textDecoration: "none" }}
                                >
                                    hausmojo@outlook.com
                                </a>
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<GavelIcon />}
                        onClick={() => setTermsOpen(true)}
                        sx={{ borderRadius: 3 }}
                    >
                        Pokaż regulamin
                    </Button>
                </Stack>
            </Box>

            {/* Модальное окно с регуламином */}
            <Dialog
                open={termsOpen}
                onClose={() => setTermsOpen(false)}
                maxWidth="md"
                fullWidth
                scroll="paper"
            >
                <DialogTitle
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                    <GavelIcon color="primary" /> Regulamin Kortowo Ninja
                </DialogTitle>
                <DialogContent dividers>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Zaktualizowano: {new Date().getFullYear()}
                    </Typography>

                    <Typography paragraph>
                        Przed korzystaniem z platformy prosimy o uważne
                        zapoznanie się z warunkami:
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Korzystanie z platformy
                    </Typography>
                    <Typography paragraph>
                        Kortowo Ninja to bezpłatna platforma do wymiany rzeczy
                        między studentami. Platforma udostępnia narzędzie
                        techniczne do zamieszczania ofert i nie pośredniczy w
                        transakcjach.
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Odpowiedzialność
                    </Typography>
                    <Typography paragraph>
                        Potwierdzasz, że korzystasz z serwisu dobrowolnie i
                        ponosisz pełną odpowiedzialność za swoje działania,
                        informacje, które zamieszczasz oraz za efekty wymiany z
                        innymi użytkownikami. Platforma i jej administratorzy
                        nie ponoszą odpowiedzialności za jakiekolwiek straty,
                        spory lub szkody.
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Zasady zamieszczania treści
                    </Typography>
                    <Typography paragraph>
                        Zabrania się zamieszczania ofert zawierających:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, "& li": { mb: 1 } }}>
                        <li>Napoje alkoholowe osobom poniżej 18 roku życia</li>
                        <li>Przemoc, dyskryminację, spam, oszustwa</li>
                        <li>Fałszywe lub wprowadzające w błąd informacje</li>
                        <li>Przedmioty zabronione prawem</li>
                        <li>Reklamę komercyjną bez zgody administracji</li>
                    </Box>

                    <Typography variant="subtitle1" gutterBottom>
                        Moderacja
                    </Typography>
                    <Typography paragraph>
                        Administracja platformy zastrzega sobie prawo do
                        usuwania dowolnych treści oraz blokowania kont za
                        naruszenie zasad bez wcześniejszego powiadomienia.
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Dane osobowe
                    </Typography>
                    <Typography paragraph>
                        Dobrowolnie udostępniasz informacje (np. link do mediów
                        społecznościowych) publicznie. Platforma nie odpowiada
                        za wykorzystanie tych danych przez osoby trzecie.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setTermsOpen(false)}
                        variant="contained"
                    >
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 6, opacity: 0.8 }}
            >
                © {new Date().getFullYear()} Ninja | Projekt studencki WMiI
            </Typography>
        </Container>
    );
};

export default InfoPage;

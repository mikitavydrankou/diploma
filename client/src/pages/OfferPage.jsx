import React from "react";
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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";

const OfferPage = () => {
    const { id } = useParams();
    const { data: offer, isLoading, error } = useOfferById(id);
    const { user } = useAuthStore();

    if (isLoading) return <p>Ładowanie szczegółów oferty...</p>;
    if (error) return <p>Błąd: {error.message}</p>;
    if (!offer) return <p>Oferta nie została znaleziona</p>;

    const isOwner = user?.id === offer.user.id;

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
                <BackButton />
                {isOwner && <DeleteButton offerId={offer.id} />}
            </Box>

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
                    label={offer.place}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                />
                <Chip
                    icon={<PersonIcon />}
                    label={`${offer.user?.username}`}
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    Opis oferty:
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        overflowWrap: "anywhere",
                    }}
                >
                    {offer.description}
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    Poszukuję:
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
                    {offer.counter_offer}
                </Typography>
            </Box>

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
                }}
            >
                Skontaktuj się przez Facebook
            </Button>
        </Container>
    );
};

export default OfferPage;

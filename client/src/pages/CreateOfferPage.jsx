import { Container, Typography } from "@mui/material";
import BackButton from "../components/buttons/BackButton";
import OfferForm from "../components/offer/OfferForm";

export const CreateOfferPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4, justifyItems: "center" }}>
            <BackButton />
            <Typography variant="h5">Stwórz ofertę</Typography>
            <Typography
                variant="body2"
                sx={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                    px: 1,
                    mb: 0,
                }}
            >
                Pamiętaj, że to jest oferta wymiany, a nie sprzedaży!
                <br />
            </Typography>
            <OfferForm />
        </Container>
    );
};

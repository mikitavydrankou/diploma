import { Container, Typography } from "@mui/material";
import BackButton from "../components/buttons/BackButton";
import OfferForm from "../components/offer/OfferForm";

export const CreateOfferPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4, justifyItems: "center" }}>
            <BackButton />
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                Stwórz ofertę
            </Typography>
            <OfferForm />
        </Container>
    );
};

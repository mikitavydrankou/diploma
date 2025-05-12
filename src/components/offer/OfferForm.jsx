import {
    Container,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { useState } from "react";
import { useCreateOffer } from "../../api/offerQueries";

const OfferForm = () => {
    const [formData, setFormData] = useState({
        place: "",
        title: "",
        description: "",
        ttlHours: "",
        counter_offer: "",
    });

    const LIMITS = {
        title: 20,
        description: 100,
        counter_offer: 40,
    };

    const { mutate, isPending, isError, error, isSuccess } = useCreateOffer();

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "title" && value.length > LIMITS.title) return;
        if (name === "description" && value.length > LIMITS.description) return;
        if (name === "counter_offer" && value.length > LIMITS.counter_offer)
            return;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Select
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        Wybierz akademik
                    </MenuItem>
                    {[
                        "DS1",
                        "DS2",
                        "DS3",
                        "DS4",
                        "DS6",
                        "DS7",
                        "DS8",
                        "DS119",
                    ].map((d) => (
                        <MenuItem key={d} value={d}>
                            {d}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    name="title"
                    label="Tytuł"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ maxLength: LIMITS.title }}
                    helperText={`${formData.title.length}/${LIMITS.title}`}
                />

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
                    Ten napis będzie widoczny na karcie oferty
                </Typography>

                <TextField
                    name="description"
                    label="Opis"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={3}
                    fullWidth
                    inputProps={{ maxLength: LIMITS.description }}
                    helperText={`${formData.description.length}/${LIMITS.description}`}
                />

                <TextField
                    type="number"
                    name="ttlHours"
                    label="Czas trwania (w godzinach)"
                    value={formData.ttlHours}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{
                        min: 1,
                        max: 12,
                        step: 1,
                    }}
                />

                <TextField
                    name="counter_offer"
                    label="Propozycja"
                    value={formData.counter_offer}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ maxLength: LIMITS.counter_offer }}
                    helperText={`${formData.counter_offer.length}/${LIMITS.counter_offer}`}
                />

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
                    Jak nie wiesz co wpisać, napisz n.p. "Czekam na propozycje"
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    size="large"
                    sx={{ mt: 2 }}
                >
                    {isPending ? "Wysyłanie..." : "Wyślij"}
                </Button>

                {isError && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        Błąd: {error.response?.data?.message || error.message}
                    </Typography>
                )}

                {isSuccess && (
                    <Typography color="success.main" sx={{ mt: 2 }}>
                        Oferta została pomyślnie dodana!
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default OfferForm;

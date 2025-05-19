import {
    Container,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
    Link as MuiLink,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
        agreeToRules: false,
    });

    const [openRules, setOpenRules] = useState(false);

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
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
            return;
        }

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

                {/* Title Group */}
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                            px: 1,
                            mb: 0,
                        }}
                    >
                        Tytuł będzie widoczny na karcie oferty
                    </Typography>
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
                </Box>

                {/* Description Group */}
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                            px: 1,
                            mb: 0,
                        }}
                    >
                        Napisz dobry opis, aby przyciągnąć uwagę innych
                        użytkowników.
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
                </Box>

                {/* TTL Hours Group */}
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                            px: 1,
                            mb: 0,
                        }}
                    >
                        Maksymalna ilość godzin to 48. Po tym czasie oferta
                        zostanie zarchiwizowana.
                    </Typography>
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
                            max: 48,
                            step: 1,
                        }}
                    />
                </Box>

                {/* Counter Offer Group */}
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                            px: 1,
                            mb: 0,
                        }}
                    >
                        Jak nie wiesz co chcesz, napisz n.p. "Czekam na
                        propozycje"
                    </Typography>
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
                </Box>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.agreeToRules}
                            onChange={handleChange}
                            name="agreeToRules"
                            color="primary"
                        />
                    }
                    label={
                        <>
                            Potwierdzam, że moja oferta jest zgodna z{" "}
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => setOpenRules(true)}
                                sx={{ cursor: "pointer" }}
                            >
                                regulaminem Kortowo Ninja
                            </MuiLink>{" "}
                            i nie zawiera treści zabronionych.
                        </>
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending || !formData.agreeToRules}
                    size="large"
                    sx={{ mt: 1 }}
                >
                    {isPending ? "Wysyłanie..." : "Wyślij"}
                </Button>

                {isError && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        Błąd: {error.response?.data?.message || error.message}
                    </Typography>
                )}

                {isSuccess && (
                    <Typography color="success.main" sx={{ mt: 1 }}>
                        Oferta została pomyślnie dodana!
                    </Typography>
                )}
            </Box>

            <Dialog
                open={openRules}
                onClose={() => setOpenRules(false)}
                maxWidth="sm"
                fullWidth
            >
                {/* Dialog content remains the same */}
            </Dialog>
        </Container>
    );
};

export default OfferForm;

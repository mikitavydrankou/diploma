// Homepage.jsx
import { Box, Typography } from "@mui/material";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/offer/OfferList";
import { InfoButton } from "../components/buttons/InfoButton";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <Box
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: "800px",
                mx: "auto",
            }}
        >
            {!user && (
                <Box
                    sx={{
                        width: "100%",
                        position: "sticky",
                        top: 0,
                        zIndex: 1000,
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        borderRadius: 3,
                        p: 3,
                        textAlign: "center", // Центрирует текст
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Центрирует дочерние элементы по горизонтали
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mt: 1,
                            fontWeight: "bold",
                        }}
                    >
                        Witamy na Ninja!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Zaloguj się, aby przeglądać i tworzyć oferty. Jeśli nie
                        masz konta, możesz je założyć.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Po zalogowaniu możesz dodawać nowe oferty i przeglądać
                        istniejące.
                    </Typography>
                    <br />
                    <InfoButton />
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                {user && <AddOfferButton />}
                <OfferList />
            </Box>
        </Box>
    );
};

export default HomePage;

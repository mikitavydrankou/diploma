// Homepage.jsx
import { Box } from "@mui/material";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/offer/OfferList";
import { InfoButton } from "../components/buttons/InfoButton";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <Box
            sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
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
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 1,
                    }}
                >
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

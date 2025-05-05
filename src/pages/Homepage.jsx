import { Box } from "@mui/material";
import AddOfferButton from "../components/Buttons/AddOfferButton";
import OfferList from "../components/Offer/OfferList";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <Box sx={{ p: 1 }}>
            {user && <AddOfferButton />}
            <OfferList />
        </Box>
    );
};

export default HomePage;

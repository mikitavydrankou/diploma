import { Box } from "@mui/material";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/offer/OfferList";
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

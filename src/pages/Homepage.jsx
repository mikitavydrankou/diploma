import AddOfferButton from "../components/Buttons/AddOfferButton";
import OfferList from "../components/offer/OfferList";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <div>
            {user && <AddOfferButton />}
            <OfferList />
        </div>
    );
};

export default HomePage;

import { useDeleteOffer } from "../../api/offerQueries";
import { useNavigate } from "react-router-dom";

export const DeleteButton = ({ offerId }) => {
    const { mutate: deleteOffer, isLoading } = useDeleteOffer();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteOffer(offerId);
        navigate("/");
    };

    return (
        <button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Usuwanie..." : "Usuń"}
        </button>
    );
};

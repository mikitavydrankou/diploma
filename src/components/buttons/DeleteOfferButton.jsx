import { useDeleteOffer } from "../../api/offerQueries";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteButton = ({ offerId }) => {
    const { mutate: deleteOffer, isLoading } = useDeleteOffer();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteOffer(offerId);
        navigate("/");
    };

    return (
        <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isLoading}
            sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "error.dark",
                    boxShadow: 2,
                },
            }}
        >
            {isLoading ? "Usuwanie..." : "Usuń ofertę"}
        </Button>
    );
};

import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowBackIosNew";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.history.length > 1 ? navigate(-1) : navigate("/");
    };

    return (
        <IconButton
            onClick={goBack}
            sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 1200,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <ArrowIcon
                sx={{
                    fontSize: 28,
                    color: "text.primary",
                }}
            />
        </IconButton>
    );
};

export default BackButton;

import { Link } from "react-router-dom";
import { Fab, styled, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SafeAreaFab = styled(Fab)(({ theme }) => ({
    position: "fixed",
    right: theme.spacing(2),
    zIndex: 1000,
    // Для устройств с физическими кнопками навигации
    bottom: `calc(56px + ${theme.spacing(2)} + env(safe-area-inset-bottom))`,

    [theme.breakpoints.up("sm")]: {
        // Для десктопов - стандартное позиционирование
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },

    // Анимация для плавного перемещения
    transition: theme.transitions.create(["bottom", "transform"], {
        duration: theme.transitions.duration.standard,
    }),
}));

function AddOfferButton() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <SafeAreaFab
            color="primary"
            aria-label="add"
            component={Link}
            to="/offer/create"
            size={isMobile ? "medium" : "large"}
            sx={{
                // Дополнительная тень для контраста с навбаром
                boxShadow: 8,
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 12,
                },
            }}
        >
            <AddIcon fontSize={isMobile ? "medium" : "large"} />
            {!isMobile}
        </SafeAreaFab>
    );
}

export default AddOfferButton;

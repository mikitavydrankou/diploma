import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const TopNavbar = () => {
    const theme = useTheme();
    const { isAdminOrModerator, user } = useAuthStore();

    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                borderBottom: `1px solid ${theme.palette.divider}`,
                boxShadow: "none",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "center",
                    height: 64,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        color: "primary.main",
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 600,
                    }}
                >
                    Ninja na Kortowie!...
                </Typography>

                {user && isAdminOrModerator() && (
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/admin"
                        sx={{
                            color: "secondary.main",
                            "&:hover": {
                                bgcolor: "action.hover",
                            },
                        }}
                    >
                        <AdminPanelSettingsIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default TopNavbar;

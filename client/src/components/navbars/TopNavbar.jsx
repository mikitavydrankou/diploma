import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useTheme,
    Box,
} from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { getUserCount } from "../../api/featureAPI";
import PersonIcon from "@mui/icons-material/Person";

const TopNavbar = () => {
    const theme = useTheme();
    const { isAdminOrModerator, user } = useAuthStore();
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const count = await getUserCount();
                setUserCount(count);
            } catch (err) {
                console.error("Failed to fetch user count", err);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                borderBottom: `1px solid ${theme.palette.divider}`,
                boxShadow: "none",
            }}
        >
            <Toolbar
                sx={{
                    height: 64,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Левый блок — название и кнопка админки */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                        Ninja na Kortowie!... Tsss...
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
                </Box>

                {/* Правый блок — иконка + счётчик */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon color="action" />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {userCount !== null ? userCount : "Загрузка..."}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavbar;

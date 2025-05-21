// Homepage.jsx
import { Box, Typography, CircularProgress } from "@mui/material";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/offer/OfferList";
import { InfoButton } from "../components/buttons/InfoButton";
import { useAuthStore } from "../store/authStore";
import { getUserCount, getOfferCount } from "../api/featureAPI.js";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";

const HomePage = () => {
    const user = useAuthStore((s) => s.user);
    const [userCount, setUserCount] = useState(null);
    const [offerCount, setOfferCount] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [users, offers] = await Promise.all([
                    getUserCount(),
                    getOfferCount(),
                ]);
                setUserCount(users);
                setOfferCount(offers);
            } catch (err) {
                console.error("Failed to fetch counts", err);
            }
        };

        fetchCounts();
    }, []);

    return (
        <Box
            sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: "800px",
                mx: "auto",
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
                        boxShadow: 2,
                        borderRadius: 3,
                        p: 3,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mt: 1,
                            fontWeight: "bold",
                        }}
                    >
                        Wymiany na Ninja!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Zaloguj się, aby tworzyć oferty!
                    </Typography>

                    {/* Статистика */}
                    <Box
                        sx={{
                            width: "100%",
                            mt: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "action.hover",
                                justifyContent: "center",
                            }}
                        >
                            {userCount === null ? (
                                <CircularProgress size={24} color="primary" />
                            ) : (
                                <>
                                    <PersonIcon color="primary" />
                                    <Typography
                                        variant="body1"
                                        fontWeight={500}
                                    >
                                        Już {userCount} zarejestrowanych
                                        użytkowników!
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "action.hover",
                                justifyContent: "center",
                            }}
                        >
                            {offerCount === null ? (
                                <CircularProgress size={24} color="primary" />
                            ) : (
                                <>
                                    <AssignmentIcon color="primary" />
                                    <Typography
                                        variant="body1"
                                        fontWeight={500}
                                    >
                                        Łącznie utworzono {offerCount} ofert!
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>

                    <br />
                    <InfoButton />
                </Box>
            )}

            <Box>
                {user && <AddOfferButton />}

                <Box
                    sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            color: "text.secondary",
                        }}
                    >
                        Oferty innych użytkowników
                    </Typography>
                </Box>

                <OfferList />
            </Box>
        </Box>
    );
};

export default HomePage;

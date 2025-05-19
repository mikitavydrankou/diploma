import React, { useEffect, useState } from "react";
import { useOffers } from "../../api/offerQueries.js";
import OfferItem from "./OfferItem.jsx";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";

const OfferList = () => {
    const { data, isLoading, error } = useOffers();
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setTime(Date.now()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );

    if (error) {
        const isNetworkError =
            error?.message?.includes("NetworkError") ||
            error?.message?.includes("Failed to fetch");
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="error">
                    {isNetworkError
                        ? "Nie ma połączenia z internetem"
                        : `Brak połączenia z serwerem, za chwilę spróbuj ponownie`}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: "0.85rem",
                        color: "text.secondary",
                        p: 1,
                        borderRadius: 2,
                        lineHeight: 1.6,
                    }}
                >
                    Jeśli problem nie ustępuje, skontaktuj się ze mną przez{" "}
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd2maOG4HMX7UiaBmdkkTLLOBJ4-8bPbeiSVFOQ7cUiYk6C6Q/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "rgba(255, 0, 0, 0.3)",
                            textDecoration: "underline",
                            textDecorationColor: "rgba(255, 0, 0, 0.3)",
                            transition: "0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
                        onMouseLeave={(e) => (e.target.style.opacity = 1)}
                    >
                        formularz kontaktowy (nacisknij)
                    </a>
                    .
                </Typography>
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="text.secondary">
                    Nie ma ofert, dodaj pierwszą!
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                },
                gap: 2,
                width: "100%",
                mx: "auto",
                maxWidth: "1600px",
            }}
        >
            {data.map((offer) => (
                <Box
                    key={offer.id}
                    sx={{
                        width: "100%",
                        aspectRatio: "1",
                    }}
                >
                    <OfferItem offer={offer} currentTime={time} />
                </Box>
            ))}
        </Box>
    );
};

export default OfferList;

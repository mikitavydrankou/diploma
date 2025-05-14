import React, { useEffect, useState } from "react";
import { useOffers } from "../../api/offerQueries.js";
import OfferItem from "./OfferItem.jsx";
import { Grid, Box, CircularProgress } from "@mui/material";

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
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr)", // телефоны
                    sm: "repeat(3, 1fr)", // планшеты
                    md: "repeat(4, 1fr)", // ноутбуки
                    lg: "repeat(5, 1fr)", // десктопы
                },
                gap: 2,
                width: "100%",
                mx: "auto", // центрирование по горизонтали, если есть maxWidth
                maxWidth: "1600px", // ограничим ширину контейнера
            }}
        >
            {data?.map((offer) => (
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

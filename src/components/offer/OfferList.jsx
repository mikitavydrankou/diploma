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
                p: 1,
                maxWidth: 1200,
                mx: "auto",
                width: "100%",
            }}
        >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
                {data?.map((offer) => (
                    <Grid
                        key={offer.id}
                        sx={{
                            gridColumn: {
                                xs: "span 4",
                                sm: "span 4",
                                md: "span 4",
                            },
                        }}
                    >
                        <OfferItem offer={offer} currentTime={time} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OfferList;

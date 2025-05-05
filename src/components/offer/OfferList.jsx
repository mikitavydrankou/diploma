import React, { useEffect, useState } from "react";
import { useOffers } from "../../api/offerQueries.js";
import OfferItem from "./OfferItem.jsx";
import { Grid, Box } from "@mui/material";

const OfferList = () => {
    const { data, isLoading, error } = useOffers();
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setTime(Date.now()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) return <p>Loading offers...</p>;
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
            <Grid container spacing={3}>
                {data?.map((offer) => (
                    <Grid
                        item
                        key={offer.id}
                        xs={4}
                        sm={3}
                        md={2}
                        sx={{
                            maxWidth: 2,
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

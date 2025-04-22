import React, { useEffect, useState } from "react";
import { useOffers } from "../../api/offerQueries.js";
import OfferItem from "./OfferItem.jsx";

const OfferList = () => {
    const { data, isLoading, error } = useOffers();
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(Date.now());
        }, 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    const offers = data;
    console.log(offers);

    if (isLoading) return <p>Loading offers...</p>;
    if (error) return <p className="error">Error: {error.message}</p>;

    return (
        <div>
            {offers.map((offer) => (
                <OfferItem key={offer.id} offer={offer} currentTime={time} />
            ))}
        </div>
    );
};

export default OfferList;

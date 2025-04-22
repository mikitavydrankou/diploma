import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOfferById } from "../api/offerQueries";
import BackButton from "../components/Buttons/BackButton";

const OfferDetails = () => {
    const { id } = useParams();
    const { data: offer, isLoading, error } = useOfferById(id);

    if (isLoading) return <p>Loading offer details...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!offer) return <p>Offer not found.</p>;

    return (
        <div>
            <BackButton />
            <div>
                Offer tittle: {offer.title}
                <p>{offer.description}</p>
                <div>
                    <p>
                        <strong>Place:</strong> {offer.place}
                    </p>
                    <p>
                        <strong>User:</strong> {offer.user?.username}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OfferDetails;

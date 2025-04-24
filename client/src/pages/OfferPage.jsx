import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOfferById } from "../api/offerQueries";
import BackButton from "../components/Buttons/BackButton";
import { DeleteButton } from "../components/Buttons/DeleteOfferButton";
import { useAuthStore } from "../store/authStore";

const OfferPage = () => {
    const { id } = useParams();
    const { data: offer, isLoading, error } = useOfferById(id);
    const { user } = useAuthStore();

    if (isLoading) return <p>Loading offer details...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!offer) return <p>Offer not found.</p>;

    const isOwner = user?.id === offer.user.id;

    return (
        <div>
            <BackButton />
            {isOwner && (
                <div className="offer-controls">
                    <DeleteButton offerId={offer.id} />
                </div>
            )}
            <div>
                Offer tittle: {offer.title}
                <div>
                    <p>
                        <strong>Opis:</strong> {offer.description}
                    </p>
                    <p>
                        <strong>Place:</strong> {offer.place}
                    </p>
                    <p>
                        <strong>User:</strong> {offer.user?.username}
                    </p>
                    <p>
                        <strong>Chce:</strong> {offer.counter_offer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OfferPage;

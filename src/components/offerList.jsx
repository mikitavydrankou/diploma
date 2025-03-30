import OfferItem from "./offerItem.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/offers/active"
        );
        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="offer-list">
      <div className="offer-list-header">
        <p>Nickname</p>
        <p>Offeruje</p>
        <p>Czas/Sczegóły</p>
      </div>
      {offers.map((offer) => (
        <OfferItem
          key={offer.id}
          offer={{
            ...offer,
            nickname: offer.user?.username || "Anonim",
            expiresAt: offer.expiresAt,
            link: "#",
          }}
          currentTime={time}
        />
      ))}
    </div>
  );
}

export default OfferList;

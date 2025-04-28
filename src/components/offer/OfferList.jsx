import styles from "./styles/Offer.module.css";
import OfferItem from "./OfferItem";
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
      } catch (err) {
        console.error("Fetch error:", err);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Ładuję listę ofert...</div>;
  }

  return (
    <div className={styles.offerList}>
      {offers.map((offer) => (
        <OfferItem key={offer.id} offer={offer} currentTime={time} />
      ))}
    </div>
  );
}

export default OfferList;

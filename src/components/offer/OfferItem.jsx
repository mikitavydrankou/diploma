import styles from "./styles/Offer.module.css";
import { Link } from "react-router-dom";

const OfferItem = ({ offer, currentTime }) => {
  const calculateTimeLeft = () => {
    const expirationDate = new Date(offer.expiresAt);
    const diff = expirationDate - currentTime;

    if (diff <= 0) return "Left";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${hours}ч ${minutes.toString().padStart(2, "0")}м`;
  };

  return (
    <div className={styles.offerCard}>
      <div className={styles.cardHeader}>
        <span className={styles.userBadge}>
          {offer.user.username || "Anonymous"}
        </span>
        <span className={styles.timer}>
          <svg className={styles.timerIcon} viewBox="0 0 24 24">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
          </svg>
          {calculateTimeLeft()}
        </span>
      </div>

      <h3 className={styles.offerTitle}>{offer.title}</h3>

      <Link to={`/offer/${offer.id}`} className={styles.cardButton}>
        Napisać
      </Link>
    </div>
  );
};

export default OfferItem;

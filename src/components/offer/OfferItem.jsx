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
            <div className={styles.headerRow}>
                <span className={styles.userBadge}>{offer.user.username}</span>
                <span className={styles.timer}>{calculateTimeLeft()}</span>
            </div>
            <h3 className={styles.offerTitle}>{offer.title}</h3>

            <Link to={`/offer/${offer.id}`} className={styles.cardButton}>
                Napisać
            </Link>
        </div>
    );
};

export default OfferItem;

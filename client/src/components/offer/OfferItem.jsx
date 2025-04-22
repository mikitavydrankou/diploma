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
            <div>
                <span className={styles.userBadge} c>
                    {offer.user.username}
                </span>
            </div>
            <span className={styles.timer}>{calculateTimeLeft()}</span>
            <h3>{offer.title}</h3>

            <Link to={`/offer/${offer.id}`} className={styles.cardButton}>
                Napisać
            </Link>
        </div>
    );
};

export default OfferItem;

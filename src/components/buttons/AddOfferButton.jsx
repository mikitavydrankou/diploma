import styles from "./Buttons.module.css";
import { Link } from "react-router-dom";

function AddOfferButton() {
  return (
    <button className={styles.addOfferButton}>
      <Link to="/createoffer" className={styles.navItem}>
        create offer
      </Link>
    </button>
  );
}

export default AddOfferButton;

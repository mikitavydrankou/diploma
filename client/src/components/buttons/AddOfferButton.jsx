import styles from "./styles/Buttons.module.css";
import { Link } from "react-router-dom";

function AddOfferButton() {
  return (
    <Link
      to="/createoffer"
      className={`${styles.button} ${styles.primaryButton}`}
    >
      Stworz ofertę
    </Link>
  );
}

export default AddOfferButton;

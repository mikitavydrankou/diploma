import styles from "./Buttons.module.css";
import { Link } from "react-router-dom";

function AddOfferButton() {
  //   return <button className={styles.addOfferButton}>Dodaj ofertę</button>;
  return (
    <Link to="/createOfferPage" className={styles.navItem}>
      create offer
    </Link>
  );
}

export default AddOfferButton;

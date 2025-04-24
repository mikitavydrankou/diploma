import { Link } from "react-router-dom";
import styles from "./styles/Buttons.module.css";

function AddOfferButton() {
    return (
        <Link to="/offer/create" className={styles.button}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
            >
                <path
                    fill="currentColor"
                    d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"
                />
            </svg>
            <span>Stworz ofertę</span>
        </Link>
    );
}

export default AddOfferButton;

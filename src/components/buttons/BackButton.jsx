import { useNavigate } from "react-router-dom";
import styles from "./styles/Buttons.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={goBack}
      className={`${styles.button} ${styles.secondaryButton} ${styles.withIcon}`}
    >
      Zamknij
    </button>
  );
};

export default BackButton;

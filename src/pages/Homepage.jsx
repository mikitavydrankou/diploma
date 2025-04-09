// import LogoutButton from "./logoutButton";
import WeekendLeaderboard from "../components/leaderboard/WeekendLeaderboad";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/offer/OfferList";
import styles from "./styles/Homepage.module.css";
import { useSelector } from "react-redux";

export const Homepage = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className={styles.homepage}>
      <WeekendLeaderboard />
      {token && <AddOfferButton />}
      <OfferList />
    </div>
  );
};

export default Homepage;

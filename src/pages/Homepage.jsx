// import LogoutButton from "./logoutButton";
import WeekendLeaderboard from "../components/WeekendLeaderboad";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/OfferList";
import "./Homepage.module.css";
import { useSelector } from "react-redux";

export const Homepage = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   <p>Welcome to the dashboard!</p>

    // </div>
    <div className="Homepage">
      {/* <LogoutButton /> */}
      <WeekendLeaderboard />
      {token && <AddOfferButton />}
      <OfferList />
    </div>
  );
};

export default Homepage;

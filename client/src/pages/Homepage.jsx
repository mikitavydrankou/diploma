// import LogoutButton from "./logoutButton";
import WeekendLeaderboard from "../components/WeekendLeaderboad";
import AddOfferButton from "../components/buttons/AddOfferButton";
import OfferList from "../components/OfferList";
import "./Homepage.module.css";

export const Homepage = () => {
  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   <p>Welcome to the dashboard!</p>

    // </div>
    <div className="Homepage">
      {/* <LogoutButton /> */}
      <WeekendLeaderboard />
      <AddOfferButton />
      <OfferList />
    </div>
  );
};

export default Homepage;

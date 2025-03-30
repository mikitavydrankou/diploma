import "./App.css";
import OfferList from "./components/offerList.jsx";
import AddOfferButton from "./components/addOfferButton.jsx";
import WeekendLeaderboard from "./components/weekendLeaderboad.jsx";

export default function App() {
  return (
    <div className="App">
      <WeekendLeaderboard />
      <AddOfferButton />
      <OfferList />
    </div>
  );
}

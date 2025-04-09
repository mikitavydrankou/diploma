// OfferPage.jsx
import { loadOfferById } from "../store/actions/offerActions.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/buttons/BackButton";

const OfferPage = () => {
  const { offerId } = useParams();
  const dispatch = useDispatch();

  const { currentOffer, isLoading, error } = useSelector(
    (state) => state.offer
  );

  useEffect(() => {
    dispatch(loadOfferById(Number(offerId)));
  }, [offerId, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentOffer) return <div>Offer not found</div>;

  return (
    <div>
      <BackButton />
      <br />
      Kto złożył ofertę - {currentOffer.user.username} <br />
      Tytuł - {currentOffer.title}
      <br />
      Akademik - {currentOffer.place}
      <br />
      Opis - {currentOffer.description}
      <br />
      Oferta wymiany - {currentOffer.counter_offer}
      <br />
      Aktywne do - {currentOffer.expiresAt}
      <br />
      Link - {currentOffer.user.link}
    </div>
  );
};

export default OfferPage;

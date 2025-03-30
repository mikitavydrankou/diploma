const OfferItem = ({ offer, currentTime }) => {
  const calculateTimeLeft = () => {
    const expirationDate = new Date(offer.expiresAt);
    const diff = expirationDate - currentTime;

    if (diff <= 0) return "0:00";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="offer-item">
      <p>{offer.user.username}</p>
      <p>{offer.title}</p>
      <div className="offer-time-and-button">
        <div className="offer-item-time">
          <p>{calculateTimeLeft()}</p>
        </div>
        <button className="look-more-button">Zobacz</button>
      </div>

      {/* TODO Сделать условную страницу как на pracul.pl. Перенести */}

      {/* Будут добавлены на новой странице */}

      {/* 
                <p>{param.counter_offer}</p>
                <p>{param.descripton}</p>
      
            <button className="to-fb-button">
                    Link na FB
            </button> */}
    </div>
  );
};

export default OfferItem;

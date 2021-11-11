import React from "react";
import { useLocation } from "react-router";

function MoviesCard(card) {
  const location = useLocation();

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__description">
          <h2 className="card__title">{card.nameRU}</h2>
          <p className="card__duration">{card.duration}</p>
        </div>
        <button
          className={`
                    ${
                      location.pathname !== "/movies"
                        ? "card__button-delete"
                        : "card__button"
                    }`}
        />
      </div>
      <img src={card.image} alt={card.nameRU} className="card__image" />
    </li>
  );
}

export default MoviesCard;

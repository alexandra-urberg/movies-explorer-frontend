import React from "react";
import { useLocation } from "react-router";

function MoviesCard(card, filterMovies) {
  const location = useLocation();
  return (
    <li
      className={`card ${
        filterMovies.length === 0 ? "moviesCardList__invisiable" : ""
      }`}
    >
      <div className="card__header">
        <div className="card__description">
          <h2 className="card__title">{card.nameRU || card.nameEN}</h2>
          <p className="card__duration">{`${
            card.duration > 60
              ? `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`
              : `${card.duration}м`
          }`}</p>
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
      <a href={card.trailerLink} className="card-link" target="blank">
        <img
          src={`https://api.nomoreparties.co${card.image}`}
          alt={card.nameRU || card.nameEN}
          className="card__image"
        />
      </a>
    </li>
  );
}

export default MoviesCard;

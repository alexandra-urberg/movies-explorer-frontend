import React from "react";
import { useLocation } from "react-router";

function MoviesCard({movie}) {
  const location = useLocation();
  console.log(movie);
  console.log(movie.key);
  
  return (
    <li key={movie.key}
      className="card">
      <div className="card__header">
        <div className="card__description">
          <h2 className="card__title">{movie.nameRU || movie.nameEN}</h2>
          <p className="card__duration">{`${
            movie.duration > 60
              ? `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`
              : `${movie.duration}м`
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
      <a href={movie.trailerLink} className="card-link" target="blank">
        <img
          src={`https://api.nomoreparties.co${movie.image}`}
          alt={movie.nameRU || movie.nameEN}
          className="card__image"
        />
      </a>
    </li>
  );
}

export default MoviesCard;

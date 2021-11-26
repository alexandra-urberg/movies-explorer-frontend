import React from "react";
import { useLocation } from "react-router";

function MoviesCard({ movie, onClicked, handleAddMovie, setOnClicked, handleDeleteMovie }) {
  const location = useLocation();

  const movieData = {
    movieId: movie.id || movie._id,
    country: movie.country || "Нет информации",
    director: movie.director || "Нет информации",
    year: movie.year || "Нет информации",
    description: movie.description || "Нет информации",
    nameRU: movie.nameRU || "Нет информации",
    nameEN: movie.nameEN || "Нет информации",
    duration: movie.duration || 0,
    image:
      `https://api.nomoreparties.co${movie.image.url}` ||
      "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2258&q=80",
    trailer: movie.trailer || "https://www.youtube.com",
    thumbnail:
      movie.thumbnail ||
      "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2258&q=80",
  };

  function onAddMovie(e) {
    e.preventDefault();
    handleAddMovie(movieData);
    setOnClicked(true);
  }

  function onDeleteMovie(e) {
    e.preventDefault();
    handleDeleteMovie(movie._id);
    setOnClicked(false);
  }

  return (
    <li key={movie.movieId} className="card">
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
          onClick={`${location.pathname === "/movies" ? onAddMovie : onDeleteMovie}`}
          className={`
                    ${
                      location.pathname === "/movies" && onClicked
                        ? "card__btton-add"
                        : location.pathname === "/movies"
                        ? "card__button"
                        : "card__button-delete"
                    }`}
        />
      </div>
      <a
        href={`${
          location.pathname === "/movies" ? movie.trailerLink : movie.trailer
        }`}
        className="card-link"
        target="blank"
      >
        <img
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU || movie.nameEN}
          className="card__image"
        />
      </a>
    </li>
  );
}

export default MoviesCard;

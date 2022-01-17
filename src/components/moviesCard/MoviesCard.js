import React from "react";
import { useLocation } from "react-router";

function MoviesCard({
  movie,
  handleAddMovie,
  handleDeleteMovie,
  isSaved,
  savedMovies,
}) {
  const location = useLocation();
  let onClicked = false;
  let savedMovie;

  const movieData = {
    movieId: String(movie.id),
    country: movie.country || "Нет информации",
    director: movie.director || "Нет информации",
    year: movie.year || "Нет информации",
    description: movie.description || "Нет информации",
    nameRU: movie.nameRU || "Нет информации",
    nameEN: movie.nameEN || "Нет информации",
    duration: movie.duration || 0,
    image:
      `https://api.nomoreparties.co${movie.image.url}` ||
      "https://www.youtube.com/",
    trailer: movie.trailerLink || "https://www.youtube.com/",
    thumbnail: isSaved
      ? movie.thumbnail
      : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
  };

  if (savedMovies) {
    onClicked = savedMovies.some((usersMovie) => {
      if (usersMovie.movieId === String(movie.id)) {
        savedMovie = usersMovie._id;
        return true;
      }
      return false;
    });
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
          type="button"
          onClick={() =>
            onClicked || movie._id
              ? handleDeleteMovie(movie._id ? movie._id : savedMovie)
              : handleAddMovie(movieData)}
          className={`
                    ${
                      isSaved
                        ? "card__button-delete"
                        : onClicked
                        ? "card__btton-add"
                        : "card__button"
                    }`}
        />
      </div>
      <a
        href={isSaved ? movie.trailer : movie.trailerLink}
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

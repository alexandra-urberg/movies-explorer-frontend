import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({
  movie,
  handleAddMovie,
  handleDeleteMovie,
  isSaved,
  savedMovies,
}) {
  const location = useLocation();
  const [onClicked, setOnClicked] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const movieVariation = savedMovies.find(
    (m) => m.nameRU === movie.nameRU && m.owner === currentUser._id
  );
  const removedMovie = savedMovies.find((m) => m.movieId === String(movie.id));

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

  function onAddDeleteMovie() {
    if (onClicked) {
      handleDeleteMovie(removedMovie._id);
    } else if (!onClicked) {
      handleAddMovie(movieData);
    }
    setOnClicked(!onClicked);
  }

  function onDeleteMovie(e) {
    e.preventDefault();
    handleDeleteMovie(movie._id);
  }

  useEffect(() => {
    if (movieVariation) {
      setOnClicked(true);
    }
  }, [movieVariation]);

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
          onClick={isSaved ? onDeleteMovie : onAddDeleteMovie}
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

import { useState } from "react";
import MediaQuery from "react-responsive";
import MoviesCardListTemplate from "../moviesCardListTemplate/MoviesCardListTemplate";

function MoviesCardList({
  filterMovie,
  firtsSearch,
  handleAddMovie,
  handleDeleteMovie,
  savedMovies,
  isSaved,
}) {
  const [visiableMax, setVisiableMax] = useState(12);
  const [visiableMed, setVisiableMed] = useState(8);
  const [visiableMin, setVisiableMin] = useState(5);

  function showMoreMoviesMax() {
    setVisiableMax((prevValue) => {
      return prevValue + 3;
    });
  }

  function showMoreMoviesMed() {
    setVisiableMed((prevValue) => {
      return prevValue + 2;
    });
  }

  function showMoreMoviesMin() {
    return setVisiableMin((prevValue) => {
      return prevValue + 2;
    });
  }

  return (
    <div className="moviesCardList">
      <span
        className={`${
          !firtsSearch && !filterMovie.length
            ? "moviesCardList__error-text"
            : "moviesCardList__invisiable"
        }`}
      >
        {"Ничего не найденно"}
      </span>
      <MediaQuery minWidth={1280}>
        <MoviesCardListTemplate
          windowSize={visiableMax}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isSaved={isSaved}
        />
        {visiableMax < filterMovie.length && (
          <button
            type="submit"
            className="moviesCardList__button-more moviesCardList__button-text"
            onClick={showMoreMoviesMax}
          >
            Еще
          </button>
        )}
      </MediaQuery>
      <MediaQuery minWidth={481} maxWidth={1279}>
        <MoviesCardListTemplate
          windowSize={visiableMed}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isSaved={isSaved}
        />
        {visiableMed < filterMovie.length && (
          <button
            type="button"
            className="moviesCardList__button-more moviesCardList__button-text"
            onClick={showMoreMoviesMed}
          >
            Еще
          </button>
        )}
      </MediaQuery>
      <MediaQuery maxWidth={480}>
        <MoviesCardListTemplate
          windowSize={visiableMin}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isSaved={isSaved}
        />
        {visiableMin < filterMovie.length && (
          <button
            type="submit"
            className="moviesCardList__button-more moviesCardList__button-text"
            onClick={showMoreMoviesMin}
          >
            Еще
          </button>
        )}
      </MediaQuery>
    </div>
  );
}

export default MoviesCardList;

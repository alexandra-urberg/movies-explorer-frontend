import { useState } from "react";
import MediaQuery from "react-responsive";
import MoviesCardListTemplate from "../moviesCardListTemplate/MoviesCardListTemplate";
import MoviesCardListButton from "../moviesCardListButton/MoviesCardListButton";

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
          filterMovie={filterMovie}
          windowSize={visiableMax}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isSaved={isSaved}
        />
        {visiableMax < filterMovie.length && (
          <MoviesCardListButton showMoreMovies={showMoreMoviesMax} />
        )}
      </MediaQuery>
      <MediaQuery minWidth={481} maxWidth={1279}>
        <MoviesCardListTemplate
          filterMovie={filterMovie}
          windowSize={visiableMed}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isSaved={isSaved}
        />
        {visiableMed < filterMovie.length && (
          <MoviesCardListButton showMoreMovies={showMoreMoviesMed} />
        )}
      </MediaQuery>
      <MediaQuery maxWidth={480}>
        <MoviesCardListTemplate
          filterMovie={filterMovie}
          windowSize={visiableMin}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isSaved={isSaved}
        />
        {visiableMin < filterMovie.length && (
          <MoviesCardListButton showMoreMovies={showMoreMoviesMin} />
        )}
      </MediaQuery>
    </div>
  );
}

export default MoviesCardList;

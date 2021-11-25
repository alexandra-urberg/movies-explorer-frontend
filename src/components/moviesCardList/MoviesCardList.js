import { useState } from "react";
import MediaQuery from "react-responsive";
import MoviesCard from "../moviesCard/MoviesCard";

function MoviesCardList({ filterMovie, textError, movie, firtsSearch }) {
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
  console.log(filterMovie);
  return (
    <div className="moviesCardList">
      <span
        className={`${
          !filterMovie.length && !firtsSearch
            ? "moviesCardList__error-text"
            : "moviesCardList__invisiable"
        }`}
      >
        {textError || " Ничего не найденно"}
      </span>
      <MediaQuery minWidth={1280}>
        <ul className="moviesCardList__container">
          {filterMovie
            .slice(0, visiableMax)
            .map((movie, { btn, filterMovies }) => {
              return (
                <MoviesCard
                  nameRU={movie.nameRU}
                  nameEN={movie.nameEN}
                  image={movie.image.url}
                  duration={movie.duration}
                  key={movie.id}
                  btn={btn}
                  trailerLink={movie.trailerLink}
                  filterMovies={filterMovies}
                />
              );
            })}
        </ul>
        {visiableMax < filterMovie.length &&
          <button
            type="submit"
            className="moviesCardList__button-more moviesCardList__button-text"
            onClick={showMoreMoviesMax}
          >
            Еще
          </button>
        }
      </MediaQuery>
      <MediaQuery minWidth={481} maxWidth={1279}>
        <ul className="moviesCardList__container">
          {filterMovie.slice(0, visiableMed).map((movie, { btn }) => {
            return (
              <MoviesCard
                nameRU={movie.nameRU}
                nameEN={movie.nameEN}
                image={movie.image.url}
                duration={movie.duration}
                key={movie.id}
                btn={btn}
                trailerLink={movie.trailerLink}
              />
            );
          })}
        </ul>
        {visiableMed < filterMovie.length &&
          <button
            type="button"
            className="moviesCardList__button-more moviesCardList__button-text"
            onClick={showMoreMoviesMed}
          >
            Еще
          </button>
        }
      </MediaQuery>
      <MediaQuery maxWidth={480}>
        <ul className="moviesCardList__container">
          {filterMovie.slice(0, visiableMin).map((movie, { btn }) => {
            return (
              <MoviesCard
                nameRU={movie.nameRU}
                nameEN={movie.nameEN}
                image={movie.image.url}
                duration={movie.duration}
                key={movie.id}
                btn={btn}
                trailerLink={movie.trailerLink}
              />
            );
          })}
        </ul>
        {visiableMin < filterMovie.length &&
          <button
            type="submit"
            className="moviesCardList__button-more moviesCardList__button-text"
            onClick={showMoreMoviesMin}
          >
            Еще
          </button>
        }
      </MediaQuery>
    </div>
  );
}

export default MoviesCardList;

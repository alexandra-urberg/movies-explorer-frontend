import React from "react";
import MoviesCard from "../moviesCard/MoviesCard";

function MoviesCardListTemplate({
  filterMovie,
  handleAddMovie,
  handleDeleteMovie,
  savedMovies,
  isSaved,
  windowSize,
}) {
  return (
    <ul className="moviesCardList__container">
      {filterMovie.slice(0, { windowSize }).map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            key={movie.id}
            handleAddMovie={handleAddMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            isSaved={isSaved}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardListTemplate;

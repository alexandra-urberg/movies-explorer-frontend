import React from "react";

function MoviesCardListButton({ showMoreMovies }) {
  return (
    <button
      type="submit"
      className="moviesCardList__button-more moviesCardList__button-text"
      onClick={showMoreMovies}
    >
      Еще
    </button>
  );
}

export default MoviesCardListButton;

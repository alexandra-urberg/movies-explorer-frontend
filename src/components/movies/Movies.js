import React from "react";
import MoviesTemplate from "../moviesTemplate/MoviesTemplate";
import MoviesCardList from "../moviesCardList/MoviesCardList";
import PopupNavigator from "../popupNavigator/PopupNavigator";

function Movies(props) {
  return (
    <main className="savedMovies">
      <MoviesTemplate />
      <MoviesCardList btn="card__button-delete" />
      <PopupNavigator
       isOpen={props.isOpen}
       onClose={props.onClose}
      />
    </main>
  );
}

export default Movies;

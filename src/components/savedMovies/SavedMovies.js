import React from "react";
import MoviesTemplate from "../moviesTemplate/MoviesTemplate";
import MoviesCardList from "../moviesCardList/MoviesCardList";
import PopupNavigator from "../popupNavigator/PopupNavigator";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function SavedMovies(props) {
  return (
    <>
      <Header onPopupOpen={props.onPopupOpen} />
      <main className="savedMovies">
        <MoviesTemplate />
        <MoviesCardList className="card__button-delete" />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;

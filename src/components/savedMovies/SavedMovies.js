import React from "react";
import MoviesTemplate from "../moviesTemplate/MoviesTemplate";
import MoviesCardList from "../moviesCardList/MoviesCardList";
import PopupNavigator from "../popupNavigator/PopupNavigator";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Preloader from "../preloader/Preloader";

function SavedMovies(props) {
  return (
    <>
      <Header onPopupOpen={props.onPopupOpen} />
      <main className="savedMovies">
        <MoviesTemplate
          checkingShortCut={props.checkingShortCut}
          filterUsersMovies={props.filterUsersMovies}
          movie={props.movie}
          setMovie={props.setMovie}
          location={props.location}
          checkShortCut={props.checkShortCut}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <span className="moviesCardList__error-text">{props.textError}</span>
        )}
        <MoviesCardList
          filterMovie={props.filterMovie}
          location={props.location}
          handleDeleteMovie={props.handleDeleteMovie}
          isSaved={true}
          savedMovies={props.savedMovies}
        />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;

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
        <MoviesTemplate
          checkingShortCut={props.checkingShortCut}
          filterUsersMovies={props.filterUsersMovies}
          movie={props.movie}
          setMovie={props.setMovie}
          location={props.location}
        />
        <MoviesCardList
          textError={props.textError}
          filterMovie={props.savedFilterMovies}
          handleDeleteMovie={props.handleDeleteMovie}
          location={props.location}
        />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;

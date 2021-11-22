import { useState } from "react";
import MoviesTemplate from "../moviesTemplate/MoviesTemplate";
import MoviesCardList from "../moviesCardList/MoviesCardList";
import PopupNavigator from "../popupNavigator/PopupNavigator";
import Preloader from "../preloader/Preloader";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Movies(props) {
  const [valid, setValid] = useState(false);

  function isValid() {
    if (props.filterMovie.length === 0 && props.movie.length !== 0) {
      return setValid(true);
    } else {
      return setValid(false);
    }
  }

  //console.log(valid)
  return (
    <>
      <Header onPopupOpen={props.onPopupOpen} />
      <main className="savedMovies">
        <MoviesTemplate
          movie={props.movie}
          setMovie={props.setMovie}
          handleSetMovies={props.handleSetMovies}
          checkingShortCut={props.checkingShortCut}
          isValid={isValid}
        />
        {props.isLoading && <Preloader />}
        <MoviesCardList
          isValid={valid}
          movie={props.movie}
          filterMovies={props.filterMovies}
          textError={props.textError}
          filterMovie={props.filterMovie}
          btn="card__button-delete"
        />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

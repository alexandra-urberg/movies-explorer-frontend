import MoviesTemplate from "../moviesTemplate/MoviesTemplate";
import MoviesCardList from "../moviesCardList/MoviesCardList";
import PopupNavigator from "../popupNavigator/PopupNavigator";
import Preloader from "../preloader/Preloader";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Movies(props) {
  return (
    <>
      <Header onPopupOpen={props.onPopupOpen} />
      <main className="movies">
        <MoviesTemplate
          movie={props.movie}
          setMovie={props.setMovie}
          handleSetMovies={props.handleSetMovies}
          checkingShortCut={props.checkingShortCut}
        />
        {props.isLoading && <Preloader />}
        <MoviesCardList
          onClicked={props.onClicked}
          movie={props.movie}
          textError={props.textError}
          filterMovie={props.filterMovie}
          firtsSearch={props.firtsSearch}
          btn="card__button"
        />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

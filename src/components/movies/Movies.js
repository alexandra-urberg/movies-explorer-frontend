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
          handleSetMovies={props.handleSetMovies}
          checkingShortCut={props.checkingShortCut}
          movie={props.movie}
          setMovie={props.setMovie}
          location={props.location}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <span className="moviesCardList__error-text">{props.textError}</span>
        )}
        <MoviesCardList
          filterMovie={props.filterMovie}
          firtsSearch={props.firtsSearch}
          handleAddMovie={props.handleAddMovie}
          location={props.location}
          handleDeleteMovie={props.handleDeleteMovie}
          savedMovies={props.savedMovies}
          isSaved={false}
        />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

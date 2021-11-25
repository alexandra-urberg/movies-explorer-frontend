import MoviesTemplate from "../moviesTemplate/MoviesTemplate";
import MoviesCardList from "../moviesCardList/MoviesCardList";
import PopupNavigator from "../popupNavigator/PopupNavigator";
import Preloader from "../preloader/Preloader";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Movies(props) {

  const beatFilmMovies = props.filterMovie.map((movie) => {
    return {
      movieId: String(movie.id),
      country: movie.country ? movie.country : "Нет информации",
      director: movie.director ? movie.director : "Нет информации",
      year: movie.year ? movie.year : "Нет информации",
      description: movie.description
        ? movie.description
        : "Нет информации",
      nameRU: movie.nameRU ? movie.nameRU : "Нет информации",
      nameEN: movie.nameEN ? movie.nameEN : "Нет информации",
      duration: movie.duration ? movie.duration : "Нет информации",
      image: movie.image,
      trailer: movie.trailerLink,
      thumbnail: movie.image,
    };
  });
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
          filterMovie={beatFilmMovies}
          firtsSearch={props.firtsSearch}
          addMovieError={props.addMovieError}
          handleAddMovie={props.handleAddMovie}
          setOnClicked={props.setOnClicked}
        />
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

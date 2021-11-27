import { useState, useEffect } from "react";

function MoviesTemplate({
  handleSetMovies,
  checkingShortCut,
  filterUsersMovies,
  movie,
  setMovie,
  location,
}) {
  const [validationErrors, setValidationErrors] = useState(""); //state of input validation

  function handleChangeMovie(e) {
    const { value } = e.target;
    setMovie(value);

    if (value.length < 1) {
      setValidationErrors("Нужно ввести ключевое слово");
    } else {
      return setValidationErrors("");
    }
  }

  function handleMoviesFilter(e) {
    e.preventDefault();
    if (location.pathname === "/movies") {
      handleSetMovies();
      return;
    } else if (location.pathname === "/saved-movies") {
      filterUsersMovies();
      return;
    }
  }

  function onFilter() {
    checkingShortCut();
  }

  useEffect(() => {
    setMovie("");
  }, [setMovie, location]);

  return (
    <div className="moviesTemplate">
      <form className="moviesTemplate__form" onSubmit={handleMoviesFilter}>
        <label className="moviesTemplate__label">
          <input
            onChange={handleChangeMovie}
            type="text"
            value={movie || ""}
            name="movie"
            className="moviesTemplate__input moviesTemplate__input-size moviesTemplate__image"
            placeholder="Введите название фильма"
            required
          />
          <button className="moviesTemplate__button"></button>
          <div className="moviesTemplate__div"></div>
          <span className={`${validationErrors ? "form__input-error" : null}`}>
            {validationErrors}
          </span>
        </label>
        <label className="moviesTemplate__search moviesTemplate__checkbox">
          <h1 className="moviesTemplate__title">Короткометражки</h1>
          <input className="moviesTemplate__input" type="checkbox" />
          <span
            className="moviesTemplate__checkbox-switch"
            onClick={onFilter}
          ></span>
        </label>
      </form>
    </div>
  );
}

export default MoviesTemplate;

import { useState } from "react";

function MoviesTemplate({
  handleSetMovies,
  checkingShortCut,
  movie,
  setMovie,
}) {
  const [validationErrors, setValidationErrors] = useState(""); //state of input validation

  function handleChangeMovie(e) {
    //Обработчик изменения инпута name обновляет стейт
    const { value } = e.target;
    setMovie(value);

    if (value.length < 1) {
      setValidationErrors("Нужно ввести ключевое слово");
    } else {
      return setValidationErrors("");
    }
  }

  function handleFilter(e) {
    e.preventDefault();
    handleSetMovies();
  }

  function onFilter() {
    checkingShortCut();
  }

  return (
    <div className="moviesTemplate">
      <form
        className="moviesTemplate__form"
        onSubmit={handleFilter}
      >
        <label className="moviesTemplate__label">
          <input
            onChange={handleChangeMovie}
            type="text"
            value={movie}
            name="movie"
            className="moviesTemplate__input moviesTemplate__input-size moviesTemplate__image"
            placeholder="Фильмы"
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
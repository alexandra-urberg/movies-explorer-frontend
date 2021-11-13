import { useState } from "react";

function MoviesTemplate() {
  const [movie, setMovie] = useState("");
  const [validationErrors, setValidationErrors] = useState({ movie: "" }); //state of input validation

  function handleChangeMovie(e) {
    //Обработчик изменения инпута name обновляет стейт
    const { value } = e.target;
    setMovie(value);

    if (value.length < 2) {
      validationErrors.movie = "Нужно ввести ключевое слово";
    } else {
      validationErrors.movie = "" && setValidationErrors(validationErrors);
    }
  }
  return (
    <div className="moviesTemplate">
      <form className="moviesTemplate__form">
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
          <button className="moviesTemplate__button" type="submit"></button>
          <span
            className={`${validationErrors.movie ? "form__input-error" : null}`}
          >
            {validationErrors.movie}
          </span>
        </label>
      </form>
      <div className="moviesTemplate__search">
        <h1 className="moviesTemplate__title">Короткометражки</h1>
        <label className="moviesTemplate__checkbox">
          <input className="moviesTemplate__input" type="checkbox" />
          <span className="moviesTemplate__checkbox-switch"></span>
        </label>
      </div>
    </div>
  );
}

export default MoviesTemplate;

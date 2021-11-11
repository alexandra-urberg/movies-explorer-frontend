import React from "react";

function MoviesTemplate() {
  return (
    <div className="moviesTemplate">
      <form className="moviesTemplate__form">
        <label className="moviesTemplate__label">
          <input
            className="moviesTemplate__input moviesTemplate__input-size moviesTemplate__image"
            placeholder="Фильмы"
          />
          <span className="moviesTemplate__input-error"></span>
          <button className="moviesTemplate__button" type="submit"></button>
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

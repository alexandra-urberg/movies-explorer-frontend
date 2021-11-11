import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function PopupNavigator(props) {
  const location = useLocation();
  return (
    <div
      className={`popupNavigator ${
        props.isOpen ? "popupNavigator_is-opened" : null
      }`}
    >
      <div className="popupNavigator__container">
        <button
          className="popupNavigator__close-button"
          onClick={props.onClose}
        />
        <ul className="popupNavigator__navigation">
          <li className="popupNavigator__link-navigation">
            <Link
              to="/"
              className={` header__link popupNavigator__title
              ${location.pathname === "/" ? "popupNavigator__active" : ""}`}
            >
              Главная
            </Link>
          </li>
          <li className="popupNavigator__link-navigation">
            <Link
              to="/movies"
              className={` header__link popupNavigator__title
              ${
                location.pathname === "/movies" ? "popupNavigator__active" : ""
              }`}
            >
              Фильмы
            </Link>
          </li>
          <li className="popupNavigator__link-navigation">
            <Link
              to="/saved-movies"
              className={` header__link popupNavigator__title
                ${
                  location.pathname === "/saved-movies"
                    ? "popupNavigator__active"
                    : ""
                }`}
            >
              Сохраненные фильмы
            </Link>
          </li>
          <li className="popupNavigator__link-navigation">
            <Link
              to="/profile"
              className={` header__link popupNavigator__title
                ${
                  location.pathname === "/profile"
                    ? "popupNavigator__active"
                    : ""
                }`}
            >
              Аккаунт
            </Link>
            <div className="header__icon"></div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PopupNavigator;

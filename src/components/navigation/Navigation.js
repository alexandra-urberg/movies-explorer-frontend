import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import MediaQuery from "react-responsive";

function Navigation(props) {
  return (
    <ul className="header__navigation">
      <Switch>
        <Route path="/profile">
          <MediaQuery minWidth={841}>
            <li className="header__link-navigation">
              <Link to="/movies" className="header__link header__font-size">
                Фильмы
              </Link>
            </li>
            <li className="header__link-navigation">
              <Link
                to="/saved-movies"
                className="header__link header__font-size"
              >
                Сохраненные фильмы
              </Link>
            </li>
            <li className="header__link-navigation">
              <Link
                to="/profile"
                className="header__link header__font-weight header__font-size"
              >
                Аккаунт
              </Link>
            </li>
            <li className="header__container">
              <div className="header__icon"></div>
            </li>
          </MediaQuery>
          <MediaQuery maxWidth={840}>
            <li className="header__sandwich">
              <button
                onClick={props.onPopupOpen}
                className="header__sandwich-icon"
              ></button>
            </li>
          </MediaQuery>
        </Route>
        <Route path="/movies">
          <MediaQuery minWidth={841}>
            <li className="header__link-navigation">
              <Link
                to="/movies"
                className="header__link header__font-weight header__font-size"
              >
                Фильмы
              </Link>
            </li>
            <li className="header__link-navigation">
              <Link
                to="/saved-movies"
                className="header__link header__font-size"
              >
                Сохраненные фильмы
              </Link>
            </li>
            <li className="header__link-navigation">
              <Link to="/profile" className="header__link header__font-size">
                Аккаунт
              </Link>
            </li>
            <li className="header__container">
              <div className="header__icon"></div>
            </li>
          </MediaQuery>
          <MediaQuery maxWidth={840}>
            <li className="header__sandwich">
              <button
                onClick={props.onPopupOpen}
                className="header__sandwich-icon"
              ></button>
            </li>
          </MediaQuery>
        </Route>
        <Route path="/saved-movies">
          <MediaQuery minWidth={841}>
            <li className="header__link-navigation">
              <Link to="/movies" className="header__link header__font-size">
                Фильмы
              </Link>
            </li>
            <li className="header__link-navigation">
              <Link
                to="/saved-movies"
                className="header__link header__font-weight header__font-size"
              >
                Сохраненные фильмы
              </Link>
            </li>
            <li className="header__link-navigation">
              <Link to="/profile" className="header__link header__font-size">
                Аккаунт
              </Link>
            </li>
            <li className="header__container">
              <div className="header__icon"></div>
            </li>
          </MediaQuery>
          <MediaQuery maxWidth={840}>
            <li className="header__sandwich">
              <button
                onClick={props.onPopupOpen}
                className="header__sandwich-icon"
              ></button>
            </li>
          </MediaQuery>
        </Route>
        <Route path="/">
          {props.isAuthorized ? (
            <>
              <MediaQuery minWidth={841}>
                <li className="header__link-navigation">
                  <Link to="/movies" className="header__link header__font-size">
                    Фильмы
                  </Link>
                </li>
                <li className="header__link-navigation">
                  <Link
                    to="/saved-movies"
                    className="header__link header__font-size"
                  >
                    Сохраненные фильмы
                  </Link>
                </li>
                <li className="header__link-navigation">
                  <Link
                    to="/profile"
                    className="header__link header__font-size"
                  >
                    Аккаунт
                  </Link>
                </li>
                <li className="header__container">
                  <div className="header__icon"></div>
                </li>
              </MediaQuery>
              <MediaQuery maxWidth={840}>
                <li className="header__sandwich">
                  <button
                    onClick={props.onPopupOpen}
                    className="header__sandwich-icon"
                  ></button>
                </li>
              </MediaQuery>
            </>
          ) : (
            <MediaQuery maxWidth={1280}>
              <li className="header__link-navigation">
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              </li>
              <li className="header__link-navigation">
                <Link to="/sign-in" className="header__link header__login">
                  Войти
                </Link>
              </li>
            </MediaQuery>
          )}
        </Route>
      </Switch>
    </ul>
  );
}

export default Navigation;

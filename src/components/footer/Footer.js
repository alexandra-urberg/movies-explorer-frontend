import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <h3 className="footer__copyRight">&#169; 2021</h3>
        <nav className="footer__links">
          <li className="margin">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="margin">
            <a
              className="footer__link"
              href="https://github.com/"
              target="blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li className="margin">
            <a
              className="footer__link margin"
              href="https://ru-ru.facebook.com/"
              target="blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

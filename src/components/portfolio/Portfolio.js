import React from "react";
import arrayImage from "../../images/array.svg";

function Portfolio() {
  return (
    <section className="portfolio width">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">
        <li className="portfolio__box">
          <a
            href="https://github.com/"
            target="blank"
            rel="noopener
                     noreferrer"
            className="portfolio__link"
          >
            <h3 className="portfolio__name">Статичный сайт</h3>
            <img src={arrayImage} alt="array" className="portfolio__array" />
          </a>
        </li>
        <li className="portfolio__box">
          <a
            href="https://github.com/"
            target="blank"
            rel="noopener
                     noreferrer"
            className="portfolio__link"
          >
            <h3 className="portfolio__name">Адаптивный сайт</h3>
            <img src={arrayImage} alt="array" className="portfolio__array" />
          </a>
        </li>
        <li className="portfolio__box">
          <a
            href="https://github.com/"
            target="blank"
            rel="noopener
                     noreferrer"
            className="portfolio__link"
          >
            <h3 className="portfolio__name">Одностраничное приложение</h3>
            <img src={arrayImage} alt="array" className="portfolio__array" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

import React from "react";

function NavTab() {
  return (
    <section className="navTab">
      <button className="navTab__button">
        <a href="#aboutProject" className="navTab__link">
          О проекте
        </a>
      </button>
      <button className="navTab__button">
        <a href="#techs" className="navTab__link">
          Технологии
        </a>
      </button>
      <button className="navTab__button">
        <a href="#student" className="navTab__link">
          Студент
        </a>
      </button>
    </section>
  );
}

export default NavTab;

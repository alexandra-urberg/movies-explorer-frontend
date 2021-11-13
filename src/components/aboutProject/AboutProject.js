import React from "react";

function AboutProject() {
  return (
    <section id="aboutProject" className="aboutProject width">
      <h2 className="title">О проекте</h2>
      <ul className="aboutProject__discription">
        <li className="aboutProject__discription-container">
          <h3 className="aboutProject__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__paragraph paragraph__font-size">
            Составление плана, работу над бэкендом, вёрстку, добавление&nbsp;
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboutProject__discription-container">
          <h3 className="aboutProject__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__paragraph paragraph__font-size">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
            было&nbsp; соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="aboutProject__time-schedule">
        <li className="aboutProject__box">
          <span className="aboutProject__period background-color">
            1 неделя
          </span>
          <span className="aboutProject__path">Back-end</span>
        </li>
        <li className="aboutProject__box">
          <span className="aboutProject__period background-color_second">
            4 недели
          </span>
          <span className="aboutProject__path">Front-end</span>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;

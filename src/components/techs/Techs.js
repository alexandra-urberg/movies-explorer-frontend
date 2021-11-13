import React from "react";
import MediaQuery from "react-responsive";

function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="title">Технологии</h2>
      <h3 className="techs__title-max">7 технологий</h3>
      <MediaQuery maxWidth={460}>
        <p className="techs__paragraph paragraph__font-size">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </MediaQuery>
      <MediaQuery minWidth={461}>
        <p className="techs__paragraph paragraph__font-size">
          <span className="promo__span">
            На курсе веб-разработки мы освоили технологии, которые применили
          </span>
          <span className="promo__span"> в дипломном проекте.</span>
        </p>
      </MediaQuery>
      <ul className="techs__stack-container">
        <li className="techs__stack">HTML</li>
        <li className="techs__stack">CSS</li>
        <li className="techs__stack">JS</li>
        <li className="techs__stack">React</li>
        <li className="techs__stack">Git</li>
        <li className="techs__stack">Express.js</li>
        <li className="techs__stack">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;

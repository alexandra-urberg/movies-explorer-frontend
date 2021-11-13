import React from "react";
import NavTab from "../navTab/NavTab";
import MediaQuery from "react-responsive";

function Promo() {
  return (
    <section className="promo">
      <MediaQuery minWidth={461}>
        <h1 className="promo__title">
          <span className="promo__span">Учебный проект студента</span>
          <span className="promo__span"> факультета Веб-разработки.</span>
        </h1>
      </MediaQuery>
      <MediaQuery maxWidth={460}>
        <h1 className="promo__title">
          Учебный проект студента&nbsp;факультета Веб-разработки.
        </h1>
      </MediaQuery>
      <NavTab />
    </section>
  );
}

export default Promo;

import React from "react";

function AboutMe() {
  return (
    <section id="student" className="aboutMe width">
      <h2 className="title">Студент</h2>
      <div className="aboutMe__container">
        <div className="aboutMe__info">
          <h3 className="aboutMe__name">Виталий</h3>
          <p className="aboutMe__field">Фронтенд-разработчик, 30 лет</p>
          <article className="aboutMe__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </article>
          <div className="aboutMe__links">
            <a
              target="blank"
              href="https://www.facebook.com/"
              className="aboutMe__link"
            >
              {" "}
              Facebook
            </a>
            <a
              target="blank"
              href="https://github.com/"
              className="aboutMe__link"
            >
              Github
            </a>
          </div>
        </div>
        <div className="aboutMe__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;

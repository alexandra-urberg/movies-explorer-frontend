import React from "react";
import MoviesCard from "../moviesCard/MoviesCard";
import initialCards from "../../utils/initialCards";

function MoviesCardList(btn) {
  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__container">
        {initialCards.map((card, { btn }) => {
          return (
            <MoviesCard
              nameRU={card.nameRU}
              image={card.image}
              duration={card.duration}
              key={card._id}
              btn={btn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MoviesCardList;

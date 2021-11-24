import React from "react";
// componnents
import Promo from "../promo/Promo";
import AboutProject from "../aboutProject/AboutProject";
import Techs from "../techs/Techs";
import AboutMe from "../aboutMe/AboutMe";
import Portfolio from "../portfolio/Portfolio";
import PopupNavigator from "../popupNavigator/PopupNavigator";

function Main(props) {
  return (
    <main className="main">
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
    </main>
  );
}

export default Main;

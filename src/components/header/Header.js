import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__logo background-color" />
      <Navigation onPopupOpen={props.onPopupOpen} />
    </header>
  );
}

export default Header;

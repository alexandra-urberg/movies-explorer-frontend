import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__logo background-color" />
      <Navigation
        onPopupOpen={props.onPopupOpen}
        isAuthorized={props.isAuthorized}
      />
    </header>
  );
}

export default Header;

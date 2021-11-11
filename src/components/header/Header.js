import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";

function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo background-color"></div>
      </Link>
      <Navigation 
       onPopupOpen={props.onPopupOpen}/>
    </header>
  );
}

export default Header;

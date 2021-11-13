import "../../index.scss";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../header/Header";
import Main from "../main/Main";
import Register from "../register/Register";
import Login from "../login/Login";
import Footer from "../footer/Footer";
import Movies from "../movies/Movies";
import SavedMovies from "../savedMovies/SavedMovies";
import Profile from "../profile/Profile";
import NotFound from "../notFound/NotFound";

function App() {
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  useEffect(() => {
    //обработчик закрытия попапов по нажатия на ESC и overlay
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    const handleCloseByOverlay = (evt) => {
      //обработчик для закртия popup по кнопке и overlay
      if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popupNavigator__close-button")
      ) {
        closePopup();
      }
    };

    document.addEventListener("click", handleCloseByOverlay);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("click", handleCloseByOverlay);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  const handleOpenPopup = (card) => {
    setIsPopupNavigatorOpen(true);
  };

  const closePopup = () => {
    setIsPopupNavigatorOpen(false);
  }
  return (
    <div className="App">
      <>
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/profile">
            <Header 
              onPopupOpen={handleOpenPopup}/>
            <Profile 
            isOpen={isPopupNavigatorOpen}
            onClose={closePopup}
            />
          </Route>
          <Route path="/saved-movies">
            <Header 
              onPopupOpen={handleOpenPopup}/>
            <SavedMovies 
            isOpen={isPopupNavigatorOpen}
            onClose={closePopup}
            />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header 
              onPopupOpen={handleOpenPopup}/>
            <Movies 
            isOpen={isPopupNavigatorOpen}
            onClose={closePopup}
            />
            <Footer />
          </Route>
          <Route path="/notFound">
            <NotFound />
          </Route>
          <Route path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
        </Switch>
      </>
    </div>
  );
}

export default App;

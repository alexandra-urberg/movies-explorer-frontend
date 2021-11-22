import "../../index.scss";
import { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";
import auth from "../../utils/auth";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  /// const [currentUser, setCurrentUser] = useState({});
  const [shortCut, setShortCut] = useState([]);
  const [checkShortCut, setCheckShortCut] = useState("");
  const [filterMovie, setFilterMovie] = useState([]); // исправить назване
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textError, setTextError] = useState(false);
  // const [registerError, setRegisterError] = useState("");
  // const [loginError, setLoginError] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userLoginInput, setUserLoginInput] = useState("");
  const [userRegisterInput, setUserRegisterInput] = useState("");
  const [name, setName] = useState({ name: "" });
  const [email, setEmail] = useState({ email: "" });

  let history = useHistory();

  // User's part //
  const tockenCheck = useCallback(() => {
    // проверяем токен
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail({ email: res.data.email });
            setName({ name: res.data.name });
            setIsAuthorized(true);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    tockenCheck();
  }, [tockenCheck]);

  const handleRegistration = (data) => {
    // внешний обработчик отвечающий за регистрацию
    setIsLoading(true);
    auth
      .registration(data)
      .then(() => {
        setIsRegistered(true);
        history.push("/sign-in");
      })
      .catch((error) => {
        setIsAuthorized(false);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAuthorization = (data) => {
    // внешний обработчик отвечающий за авторизацию
    setIsLoading(true);
    auth
      .authorize(data)
      .then((res) => {
        setEmail({ email: data.email });
        setIsAuthorized(true);
        localStorage.setItem("jwt", res.token);
        history.push("/movies");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const signOut = () => {
    // внешний обработчик отвечающий за выход
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    window.location.reload("/sign-in"); // перезагружаем страницу после выхода, что вся информация о предыдущем user удалялась
  };
  // Movies part//
  useEffect(() => {
    setTimeout(() => {
      moviesApi
        .getInitialCards()
        .then((moviesData) => {
          setMovies(moviesData);
        })
        .catch((error) => {
          if (error.message === 500) {
            setTextError(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
          }
          return console.log(error.message);
        });
    }, 800);
  }, []);

  function filtrationMovies(movies) {
    return movies.filter((value) =>
      value.nameRU.toLowerCase().includes(movie.toLowerCase())
    );
  }

  function checkingShortCut() {
    checkShortCut ? setCheckShortCut(false) : setCheckShortCut(true);
  }

  function filtrationShort(movies) {
    return movies.filter((value) => (value.duration < 41 ? value : false));
  }

  const filterMovies = filtrationMovies(movies, movie);

  const handleSetMovies = () => {
    const filterShortCards = filtrationShort(filterMovies);
    setIsLoading(true);
    setFilterMovie(filterMovies);
    setShortCut(filterShortCards);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

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
        evt.target.classList.contains("popupNavigator")
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
  };

  return (
    <CurrentUserContext.Provider>
      <div className="App">
        <>
          <Switch>
            <Route path="/">
              <Header isAuthorized={isAuthorized} />
              <Main />
              <Footer />
            </Route>
            <Route path="/sign-up">
              {isRegistered ? (
                <Redirect to="/sign-in" />
              ) : (
                <Register
                  isLoading={isLoading}
                  isRegistered={isRegistered}
                  onRegistered={handleRegistration}
                  userRegisterInput={userRegisterInput}
                  setUserRegisterInput={setUserRegisterInput}
                />
              )}
            </Route>
            <Route path="/sign-in">
              {isAuthorized ? (
                <Redirect to="/movies" />
              ) : (
                <Login
                  isLoading={isLoading}
                  isAuthorized={isAuthorized}
                  onAuthorization={handleAuthorization}
                  userLoginInput={userLoginInput}
                  setUserLoginInput={setUserLoginInput}
                />
              )}
            </Route>
            <ProtectedRoute path="/profile">
              <Header onPopupOpen={handleOpenPopup} />
              <Profile
                onSignOut={signOut}
                name={name}
                email={email}
                userInput={userInput}
                setUserInput={setUserInput}
                isOpen={isPopupNavigatorOpen}
                onClose={closePopup}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies">
              <Header onPopupOpen={handleOpenPopup} />
              <SavedMovies
                isOpen={isPopupNavigatorOpen}
                onClose={closePopup}
                checkingShortCut={checkingShortCut}
                filterMovie={checkShortCut ? shortCut : filterMovie}
                isLoading={isLoading}
                filterMovies={filterMovies}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute path="/movies">
              <Header onPopupOpen={handleOpenPopup} />
              <Movies
                setMovie={setMovie}
                textError={textError}
                checkingShortCut={checkingShortCut}
                movie={movie}
                filterMovies={filterMovies}
                handleSetMovies={handleSetMovies}
                filterMovie={checkShortCut ? shortCut : filterMovie}
                isLoading={isLoading}
                isOpen={isPopupNavigatorOpen}
                onClose={closePopup}
              />
              <Footer />
            </ProtectedRoute>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import "../../index.scss";
import { useState, useEffect, useCallback } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
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
  //User's
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  //Movie's
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortCut, setShortCut] = useState([]);
  const [checkShortCut, setCheckShortCut] = useState("");
  const [filterMovie, setFilterMovie] = useState([]); // исправить назване
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  //Inputs
  const [movie, setMovie] = useState(""); // value for the movie's component input
  const [name, setName] = useState({ name: "" });
  const [email, setEmail] = useState({ email: "" });
  //Errors
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userUpdateError, setUserUpdateError] = useState("");
  const [movieError, setMovieError] = useState("");
  // const [addMovieError, setAddMovieError] = useState("");
  // const [deleteMovieError, setDeleteMovieError] = useState("");

  let history = useHistory();
  let location = useLocation();
  //User's part
  useEffect(() => {
    //information about user and user's movies
    if (isAuthorized) {
      setIsLoading(true);
      Promise.all([mainApi.getPersonalInformation(), mainApi.getSavedMovies()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData.data);
          setSavedMovies(cardData.data);
        })
        .catch((error) => {
          if (error === 500 || "Failed to fetch")
            return setRegisterError("На сервере произошла ошибка");
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 700);
        });
    }
  }, [isAuthorized]);

  const tockenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setName({ name: res.data.name });
            setEmail({ email: res.data.email });
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
    setIsLoading(true);
    auth
      .registration(data)
      .then(() => {
        setIsRegistered(true);
        history.push("/sign-in");
      })
      .catch((error) => {
        setIsAuthorized(false);
        if (error === 500 || "Failed to fetch")
          return setRegisterError("На сервере произошла ошибка");
        if (error === 409)
          return setRegisterError("Пользователь с таким email уже существует.");
        if (error === 400)
          return setLoginError("Все поля должны быть заполнены");
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };

  const handleAuthorization = (data) => {
    setIsLoading(true);
    auth
      .authorize(data)
      .then((res) => {
        setEmail({ email: data.email });
        setIsAuthorized(true);
        localStorage.setItem("jwt", res.token);
        history.push("/movies");
      })
      .catch((error) => {
        setIsAuthorized(false);
        if (error === 500 || "Failed to fetch")
          return setLoginError("На сервере произошла ошибка");
        if (error === 400)
          return setLoginError("Все поля должны быть заполнены");
        if (error === 401)
          return setLoginError("Вы ввели неправильный логин или пароль.");
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsAuthorized(false);
    setMovies([]);
    setSavedMovies([]);
    history.push("/sign-in");
    window.location.reload("/sign-in"); //reload the page
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    mainApi
      .editPersonalProfile(data)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.data.name,
          email: res.data.email,
        });
        history.push(location.pathname);
      })
      .catch((error) => {
        if (error === 500 || "Failed to fetch")
          return setUserUpdateError("На сервере произошла ошибка");
        if (error === 409)
          return setUserUpdateError(
            "Пользователь с таким email уже существует."
          );
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };
  //Movie's part
  useEffect(() => {
    setTimeout(() => {
      moviesApi
        .getInitialCards()
        .then((moviesData) => {
          setMovies(moviesData);
        })
        .catch((error) => {
          if (error.message === 500 || "Failed to fetch") {
            setMovieError(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
          }
          return console.log(error.message);
        });
    }, 900);
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
    }, 900);
  };
  //Open/close navigation when page's size max-width 840px
  const handleOpenPopup = (card) => {
    setIsPopupNavigatorOpen(true);
  };

  const closePopup = () => {
    setIsPopupNavigatorOpen(false);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <>
          <Switch>
            <Route exact path="/">
              <Header
                isAuthorized={isAuthorized}
                onPopupOpen={handleOpenPopup}
              />
              <Main onClose={closePopup} isOpen={isPopupNavigatorOpen} />
              <Footer />
            </Route>
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              onPopupOpen={handleOpenPopup}
              setMovie={setMovie}
              textError={movieError}
              setTextError={setMovieError}
              checkingShortCut={checkingShortCut}
              movie={movie}
              filterMovies={filterMovies}
              handleSetMovies={handleSetMovies}
              filterMovie={checkShortCut ? shortCut : filterMovie}
              isLoading={isLoading}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              loggedIn={isAuthorized}
            />
            <ProtectedRoute
              exact
              path="/profile"
              onUpdate={handleUpdateUser}
              component={Profile}
              onPopupOpen={handleOpenPopup}
              onSignOut={signOut}
              name={name}
              email={email}
              userInput={userUpdateError}
              setUserInput={setUserUpdateError}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              loggedIn={isAuthorized}
              currentUser={currentUser}
              isLoading={isLoading}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              savedMovies={savedMovies}
              component={SavedMovies}
              onPopupOpen={handleOpenPopup}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              checkingShortCut={checkingShortCut}
              filterMovie={checkShortCut ? shortCut : filterMovie}
              isLoading={isLoading}
              filterMovies={filterMovies}
              loggedIn={isAuthorized}
            />
            <Route exact path="/sign-up">
              {isRegistered ? (
                <Redirect to="/sign-in" />
              ) : (
                <Register
                  registerError="registerError"
                  isLoading={isLoading}
                  isRegistered={isRegistered}
                  onRegistered={handleRegistration}
                  userRegisterInput={registerError}
                  setUserRegisterInput={setRegisterError}
                />
              )}
            </Route>
            <Route exact path="/sign-in">
              {isAuthorized ? (
                <Redirect to="/movies" />
              ) : (
                <Login
                  isLoading={isLoading}
                  isAuthorized={isAuthorized}
                  onAuthorization={handleAuthorization}
                  userLoginInput={loginError}
                  setUserLoginInput={setLoginError}
                />
              )}
            </Route>
            <Route exact path="/*">
              <NotFound />
            </Route>
          </Switch>
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

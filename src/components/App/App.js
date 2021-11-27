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
  const [filterMovie, setFilterMovie] = useState([]);
  const [firtsSearch, setFirtsSearch] = useState(true);
  const [checkShortCut, setCheckShortCut] = useState("");
  //Inputs
  const [movie, setMovie] = useState("");
  const [name, setName] = useState({ name: "" }); // value for the currentUser name at Profile component
  const [email, setEmail] = useState({ email: "" }); // value for the currentUser email at Profile component
  //Errors
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [addError, setAddError] = useState("");
  const [userUpdateError, setUserUpdateError] = useState("");
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  

  let history = useHistory();
  const location = useLocation();
  //User's part
  useEffect(() => {
    //information about user and user's movies
    if (isAuthorized) {
      setIsLoading(true);
      Promise.all([mainApi.getPersonalInformation(), mainApi.getSavedMovies()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData.data);
          setSavedMovies(cardData);
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

  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsAuthorized(false);
    setMovies([]);
    setFilterMovie([]);
    setSavedMovies([]);
    setShortCut([]);
    setFilterMovie("");
    setAddError("");
    setLoginError("");
    setRegisterError("");
    history.push("/sign-in");
    window.location.reload("/sign-in"); //reload the page
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
            setAddError(
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

  function handleSetMovies() {
    const filterMovies = filtrationMovies(movies);
    const filterShortCards = filtrationShort(filterMovies);
    setIsLoading(true);
    setFilterMovie(filterMovies);
    setShortCut(filterShortCards);
    setFirtsSearch(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }

  const handleAddMovie = (data) => {
    setIsLoading(true);
    mainApi
      .addNewCard(data)
      .then((moviesData) => {
        setSavedMovies([moviesData, ...savedMovies]);
      })
      .catch((error) => {
        if (error === 500 || "Failed to fetch") {
          return setAddError("На сервере произошла ошибка");
        } else {
          return (error) => {
            console.log(error.message);
          };
        }
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };

  const handleDeleteMovie = (movie) => {
    const usersMovies = savedMovies.find((m) => m.movieId === movie.movieId);
    setIsLoading(true);
    console.log(movie);
    console.log(movie._id);
    console.log(movie.id);
    mainApi
      .deleteCard(usersMovies._id)
      .then(() => {
        setSavedMovies((usersMovie) =>
          usersMovie((mov) => mov._id !== movie._id)
        );
      })
      .catch((error) => {
        if (error === 500 || "Failed to fetch") {
          return setAddError("На сервере произошла ошибка");
        } else {
          return (error) => {
            console.log(error.message);
          };
        }
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 700);
      });
  };

  useEffect(() => {
    setAddError("");
  }, [movies, location]);

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
              movie={movie}
              setMovie={setMovie}
              onPopupOpen={handleOpenPopup}
              textError={addError}
              checkingShortCut={checkingShortCut}
              handleSetMovies={handleSetMovies}
              filterMovie={checkShortCut ? shortCut : filterMovie}
              isLoading={isLoading}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              loggedIn={isAuthorized}
              firtsSearch={firtsSearch}
              handleAddMovie={handleAddMovie}
              location={location}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              savedFilterMovies={
                checkShortCut
                  ? filtrationMovies(filtrationShort(savedMovies, movie))
                  : movie
                  ? filtrationMovies(savedMovies, movie)
                  : checkShortCut
                  ? filtrationShort(savedMovies)
                  : savedMovies
              }
              component={SavedMovies}
              checkShortCut={checkShortCut}
              onPopupOpen={handleOpenPopup}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              isLoading={isLoading}
              loggedIn={isAuthorized}
              handleDeleteMovie={handleDeleteMovie}
              textError={addError}
              checkingShortCut={checkingShortCut}
              movie={movie}
              setMovie={setMovie}
              location={location}
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
              textError={userUpdateError}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              loggedIn={isAuthorized}
              currentUser={currentUser}
              isLoading={isLoading}
              checkingShortCut={checkingShortCut}
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

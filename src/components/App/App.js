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
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [successText, setSuccessText] = useState("");
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
  const [usersMoviesInput, setUsersMoviesInput] = useState("");
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
        .then(([userData, moviesData]) => {
          setCurrentUser(userData.data);
          const usersSavedMovies = moviesData.filter((movie) => {
            return movie.owner === userData.data._id;
          });
          setSavedMovies(usersSavedMovies);
          localStorage.setItem("savedMovies", JSON.stringify(usersSavedMovies));
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
        setIsAuthorized(true);
        history.push("/movies");
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
        setSuccessText("Информация успешно обновленна");
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
    localStorage.removeItem("savedMovies");
    setIsAuthorized(false);
    setMovies([]);
    setFilterMovie([]);
    setSavedMovies([]);
    setShortCut([]);
    setFilterMovie("");
    setAddError("");
    setLoginError("");
    setRegisterError("");
    setUsersMoviesInput("");
    history.push("/");
    window.location.reload(); //reload the page
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

  function filterUsersMovies() {
    setUsersMoviesInput(savedMovies);
  }

  function handleAddMovie(data) {
    setIsLoading(true);
    mainApi
      .addNewCard(data)
      .then((moviesData) => {
        const usersMovies = [moviesData, ...savedMovies];
        setSavedMovies(usersMovies);
        setSuccessText("Фильм успешно добавлен");
        localStorage.setItem("savedMovies", JSON.stringify(usersMovies));
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
  }

  function handleDeleteMovie(movieId) {
    setIsLoading(true);
    mainApi
      .deleteCard(movieId)
      .then(() => {
        const moviesList = savedMovies.filter(
          (m) => m._id !== movieId && movie
        );
        setSavedMovies(moviesList);
        setSuccessText("Фильм успешно удален");
        localStorage.setItem("savedMovies", JSON.stringify(moviesList));
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
        setTimeout(() => setIsLoading(false), 800);
      });
  }

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
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              location={location}
              successText={successText}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              filterMovie={
                usersMoviesInput && checkShortCut
                  ? filtrationMovies(
                      filtrationShort(savedMovies, usersMoviesInput)
                    )
                  : usersMoviesInput
                  ? filtrationMovies(savedMovies, usersMoviesInput)
                  : checkShortCut
                  ? filtrationShort(savedMovies)
                  : savedMovies
              }
              component={SavedMovies}
              savedMovies={savedMovies}
              filterUsersMovies={filterUsersMovies}
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
              successText={successText}
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
              userUpdateError={userUpdateError}
              setUserUpdateError={setUserUpdateError}
              isOpen={isPopupNavigatorOpen}
              onClose={closePopup}
              loggedIn={isAuthorized}
              currentUser={currentUser}
              isLoading={isLoading}
              checkingShortCut={checkingShortCut}
              successText={successText}
              setSuccessText={setSuccessText}
            />
            <Route exact path="/sign-up">
              {isAuthorized ? (
                <Redirect to="/movies" />
              ) : (
                <Register
                  registerError="registerError"
                  isLoading={isLoading}
                  isRegistered={isAuthorized}
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

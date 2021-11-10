import '../../index.scss';
import { Route, Switch } from "react-router-dom";
import Header from '../header/Header';
import Main from '../main/Main';
import Register from '../register/Register';
import Login from '../login/Login';
import Footer from '../footer/Footer';
import Movies from '../movies/Movies';
import SavedMovies from '../savedMovies/SavedMovies';
import Profile from '../profile/Profile';
import NotFound  from '../notFound/NotFound';

function App() {

  return (
    <div className="App">
      <>
       <Switch>
          <Route path='/sign-up'>
            <Register />
          </Route>
          <Route path='/sign-in'>
            <Login />
          </Route>
          <Route path='/profile'>
            <Header />
            <Profile />
          </Route>
          <Route path='/saved-movies'>
            <Header />
            <SavedMovies />
            <Footer />
          </Route>
          <Route path='/movies'>
            <Header />
            <Movies />
            <Footer />
          </Route>
          <Route path="/notFound">
            <NotFound />
          </Route>
          <Route path='/'>
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
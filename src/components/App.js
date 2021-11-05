import '../index.scss';
import { Route, Switch } from "react-router-dom";
import Header from './header/Header';
import Main from './main/Main';
import Register from './register/Register';
import Login from './login/Login';
import Footer from './footer/Footer';
import Movies from './movies/Movies';
import SavedMovies from './savedMovies/SavedMovies';
import Profile from './profile/Profile';

function App() {
  return (
    <div className="App">
      <>
       <Header />
       <Switch>
          <Route path='/sign-up'>
            <Register />
          </Route>
          <Route path='/sign-in'>
            <Login />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies />
          </Route>
          <Route path='/movies'>
            <Movies />
          </Route>
          <Route path='/'>
            <Main />
          </Route>
       </Switch>
       <Footer />
      </>
    </div>
  );
}

export default App;
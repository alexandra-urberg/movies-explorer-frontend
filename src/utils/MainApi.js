class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("We have found an error."`Error: ${res.status}`);
  }

  getPersonalInformation() {
    //запрашиваем информацию с сервера о user/users
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  editPersonalProfile(data) {
    // запрагиваем  измение инфомуции о user и сохранении его на сервере
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._handleResponse);
  }

  addNewCard(movie) {
    // запрашиваем добавить новую карточку на сервер
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const mainApi = new MainApi({
  url: "https://api.nomoredomains.diploma.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;

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
        emailt: data.email,
      }),
    }).then(this._handleResponse);
  }

  addNewCard(data) {
    // запрашиваем добавить новую карточку на сервер
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
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

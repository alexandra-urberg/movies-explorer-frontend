class MoviesApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getInitialCards() { //запрашиваем все карточки с фотографиями из сервера 
        return fetch(this._url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject('We have found an error.' `Error: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

const moviesApi = new MoviesApi ({
    url: "https://api.nomoreparties.co/beatfilm-movies",
})

export default moviesApi;
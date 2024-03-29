class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;        
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
    
        return Promise.reject(`Error: ${res.status}`);
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUser()]);
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    changeUser({userName, userOccupation}) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: userName,
                about: userOccupation,
            })
        })
        .then(this._handleResponse)
    }

    changeAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar,
            })
        })
        .then(this._handleResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "GET"
        })
        .then(this._handleResponse)
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(this._handleResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            headers: this._headers,
            method: "DELETE"
        })
        .then(this._handleResponse)
    }

    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            headers: this._headers,
            method: "PUT"
        })
        .then(this._handleResponse)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            headers: this._headers,
            method: "DELETE"
        })
        .then(this._handleResponse)
    }

}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "0c1c8300-b967-41c5-9764-d6d1a233a155",
      "Content-Type": "application/json"
    }
  });

export default api;
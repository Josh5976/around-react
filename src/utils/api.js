class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;        
    }

    _handleErrorResponse(err) {
        console.log(err);
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
        .catch(this._handleErrorResponse)
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
        .catch(this._handleErrorResponse)
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
        .catch(this._handleErrorResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "GET"
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            headers: this._headers,
            method: "DELETE"
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }

    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            headers: this._headers,
            method: "PUT"
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
        
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            headers: this._headers,
            method: "DELETE"
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }

}

export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "0c1c8300-b967-41c5-9764-d6d1a233a155",
      "Content-Type": "application/json"
    }
  });
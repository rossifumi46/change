class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(endPoint, method='GET', body) {
    return fetch(this._baseUrl + endPoint, {
      method,
      headers: this._headers,
      body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        // если ошибка, отклоняем промис
        console.log(res.err);
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getPoem(query) {
    return this._makeRequest(`/?q=${query}`);
  }

}

const api = new Api({
  baseUrl: 'https://buymebuyme.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
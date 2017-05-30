class JornadaService{
    constructor(httpClient){
        this._httpClient = httpClient;
        this._url = "http://localhost:3009/v1";
    }

    obterJornadas(query){
        return this._httpClient
                    .get(`${this._url}/jornadas`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }
}

JornadaService.$inject = ['$http'];

angular.module('monitriip-web')
        .service('JornadaService',JornadaService);
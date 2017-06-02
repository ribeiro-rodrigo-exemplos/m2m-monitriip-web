class JornadaService{
    constructor(httpClient, m2mconfig){
        this._httpClient = httpClient;
        this._url = m2mconfig.apiMonitriipPainel;
    }

    obterJornadas(query){
        return this._httpClient
                    .get(`${this._url}/v1/jornadas`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }
}

JornadaService.$inject = ['$http', 'm2mconfig'];

angular.module('monitriip-web')
        .service('JornadaService',JornadaService);
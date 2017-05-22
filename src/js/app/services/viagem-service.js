class ViagemService{
    constructor(httpClient,promise){
        this._httpClient = httpClient;
        this._promise = promise;
        this._url = "http://localhost:3009/v1";
    }

    obterViagemPorId(id){
         return this._httpClient.get(`${this._url}/viagens/${id}`)
                                .then(response => response.data);
    }
}

ViagemService.$inject = ['$http','$q'];

angular.module('monitriip-web')
        .service('ViagemService',ViagemService);
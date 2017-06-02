class ViagemService{
    constructor(httpClient,promise, m2mconfig){
        this._httpClient = httpClient;
        this._promise = promise;
        this._url = m2mconfig.apiMonitriipPainel;
    }

    obterViagemPorId(id){
         return this._httpClient.get(`${this._url}/v1/viagens/${id}`)
                                .then(response => response.status == 200 ? response.data : null);
    }
}

ViagemService.$inject = ['$http','$q','m2mconfig'];

angular.module('monitriip-web')
        .service('ViagemService',ViagemService);
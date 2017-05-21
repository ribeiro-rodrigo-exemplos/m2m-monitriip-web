class ViagemService{
    constructor(httpClient,promise){
        this._httpClient = httpClient;
        this._promise = promise;
    }

    obterViagemPorId(id){
         
    }
}

ViagemService.$inject = ['$http','$q'];

angular.module('monitriip-web')
        .service('ViagemService',ViagemService);
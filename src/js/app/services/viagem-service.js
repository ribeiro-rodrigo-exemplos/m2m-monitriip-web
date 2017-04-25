class ViagemService{
    constructor(httpClient){
        this.httpClient = httpClient; 
    }

    obterViagemPorId(id){

    }
}

ViagemService.$inject = ['$http'];

angular.module('monitriip-web')
        .service('ViagemService',ViagemService);
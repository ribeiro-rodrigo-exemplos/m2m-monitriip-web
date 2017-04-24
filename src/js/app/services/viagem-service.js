class ViagemService{
    constructor(httpClient){
        this.httpClient = httpClient; 
    }
}

ViagemService.$inject = ['$http'];

angular.module('monitriip-web')
        .service('ViagemService',ViagemService);
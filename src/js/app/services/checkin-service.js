class CheckinService{
    constructor(httpClient, m2mconfig){
        this._httpClient = httpClient;
        this._url = m2mconfig.apiMonitriipPainel;
    }

    obterBilheteCheckin(id){
         return this._httpClient.get(`${this._url}/v1/checkin/${id}`)
                                .then(response => response.status == 200 ? response.data : null);
    }
}

CheckinService.$inject = ['$http','m2mconfig'];

angular.module('monitriip-web')
        .service('CheckinService',CheckinService);
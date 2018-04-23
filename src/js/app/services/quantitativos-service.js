 class QuantitativosService{
    constructor(httpClient,m2mconfig){
        this._httpClient = httpClient; 
        this._url = m2mconfig.apiMonitriipPainel;
    }

    obterQuantitativosDoMes(mes){
        return this._httpClient.get(`${this._url}/v1/totalizadores?mes=${mes}`)
                                .then(response => response.status == 200 ? response.data : []);
    }

    obterQuantitativosDoDia(data){
        return this._httpClient.get(`${this._url}/v1/totalizadores?data=${data}`)
                                .then(response => response.status == 200 ? response.data : []); 
    }
}

QuantitativosService.$inject = ['$http','m2mconfig'];

angular.module('monitriip-web')
        .service('QuantitativosService',QuantitativosService);
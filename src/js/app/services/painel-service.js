/**
 * Created by Rodrigo Ribeiro on 25/04/17.
 */
class PainelService{
    constructor(httpClient,promise){
        this._httpClient = httpClient;
        this._promise = promise;
        this._url = "http://localhost:3009/v1";
    }

    consultarPeriodo(dataInicial,dataFinal,cnpjCliente,cpfMotorista,placaVeiculo){

         const query = this._createQuery(dataInicial,dataFinal,cnpjCliente,cpfMotorista,placaVeiculo);

         let totalizadoresPromise = this._obterTotalizadores(query);
         let extratosPromise = this._obterExtratos(query);
         let jornadasPromise = this._obterJornadas(query);

        return this._promise.all({
                    totalizadoresPromise,
                    extratosPromise,
                    jornadasPromise
               })
                .then(response => this._prepareResult(response));
    }

    _obterTotalizadores(query){
        return this._httpClient
                    .get(`${this._url}/viagens/totalizadores`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }

    _obterExtratos(query){
        return this._httpClient
                    .get(`${this._url}/viagens/extratos`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }

    _obterJornadas(query){
        return this._httpClient
                    .get(`${this._url}/jornadas`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }

    _createQuery(dataInicial,dataFinal,cnpjCliente,cpfMotorista,placaVeiculo){
        let query = {};

        if(cpfMotorista)
            query.cpfMotorista = cpfMotorista;
        
        if(placaVeiculo)
            query.placaVeiculo = placaVeiculo;
        
        if(cnpjCliente)
            query.cnpjCliente = cnpjCliente;
        
        query.dataInicial = dataInicial;
        query.dataFinal = dataFinal;

        return query;
    }

    _prepareResult(result){
        
        let totalizadores = result.totalizadoresPromise;
        let jornadas = result.jornadasPromise;
        let extratos = result.extratosPromise; 

        let rootData = {};

        totalizadores.forEach(t => {
            rootData[t._id] = t;
            t.extratos = [];
            t.jornadas = [];
        });

        extratos.forEach(extrato => {
            if(!rootData[extrato.dataInicial])
                this._criarData(rootData,extrato.dataInicial);

            rootData[extrato.dataInicial].extratos.push(extrato);
        });

        jornadas.forEach(jornada => {
            if(!rootData[jornada.dataInicial])
                this._criarData(rootData,jornada.dataInicial); 

            rootData[jornada.dataInicial].jornadas.push(jornada);
        });

        rootData.datas = Object.keys(rootData).sort(); 

        return rootData;
    }

    _criarData(rootData,data){
        if(!rootData[data])
            rootData[data] = {};
        
        if(!rootData[data].jornadas)
           rootData[data].jornadas = [];
        
        if(!rootData[data].extratos)
            rootData[data].extratos = [];
        
        if(!rootData[data].direcoesContinuas)
            rootData[data].direcoesContinuas = [];

        if(!rootData[data].totalParadas)
            rootData[data].totalParadas = 0;
    }
}

PainelService.$inject = ['$http',"$q"];

angular.module('monitriip-web')
        .service('PainelService',PainelService);

/**
 * Created by Rodrigo Ribeiro on 25/04/17.
 */
class PainelService{
    constructor(httpClient,promise, m2mconfig, DateUtil){
        this._httpClient = httpClient;
        this._promise = promise;
        this._url = m2mconfig.apiMonitriipPainel;
        this._dateUtil = DateUtil;
    }

    consultarPeriodo(dataInicial,dataFinal,cnpjCliente,cpfMotorista,placaVeiculo){

         const query = this._createQuery(dataInicial,dataFinal,cnpjCliente,cpfMotorista,placaVeiculo);
         
         let totalizadoresPromise = this._obterTotalizadores(query);
         let extratosPromise = this._obterExtratos(query);
         let jornadasPromise = this._obterJornadas(query);
         let data = this._dateUtil._obterPeriodo(moment(dataInicial), moment(dataFinal));

        return this._promise.all({
                    totalizadoresPromise,
                    extratosPromise,
                    jornadasPromise
               })
                .then(response => this._prepareResult(response, data));
    }

    _obterTotalizadores(query){
        return this._httpClient
                    .get(`${this._url}/v1/viagens/totalizadores`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }

    _obterExtratos(query){
        return this._httpClient
                    .get(`${this._url}/v1/viagens/extratos`,{params:query})
                    .then(response => response.status == 200 ? response.data : []);
    }

    _obterJornadas(query){
        return this._httpClient
                    .get(`${this._url}/v1/jornadas`,{params:query})
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

    _prepareResult(result, data){
        
        if(this._semRetorno(result))
            return null; 

        let totalizadores = result.totalizadoresPromise;
        let jornadas = result.jornadasPromise;
        let extratos = result.extratosPromise; 

        let rootData = {};

        data.forEach(dt =>{
            this._criarData(rootData,dt);
        });

        totalizadores.forEach(t => {
            rootData[t._id] = t;
            t.extratos = [];
            t.jornadas = [];
        });

        extratos.forEach(extrato => {
            if(rootData[extrato.dataInicial])
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

    _semRetorno(result){
        return !result.totalizadoresPromise.length && !result.jornadasPromise.length && !result.extratosPromise.length;
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

PainelService.$inject = ['$http',"$q", 'm2mconfig', 'DateUtil'];

angular.module('monitriip-web')
        .service('PainelService',PainelService);

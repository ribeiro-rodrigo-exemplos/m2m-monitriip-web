/**
 * Created by Rodrigo Ribeiro on 25/04/17.
 */
class PainelService{
    constructor(httpClient,promise){
        this._httpClient = httpClient;
        this._promise = promise;
    }

    obterTotalizadoresDoPeriodo(dataInicial,dataFinal,cpfMotorista,placaVeiculo){

         let defer = this._promise.defer();

         defer.resolve({
             "viagens": [
                 {
                     "_id": "1",
                     "descricaoLinha": null,
                     "tipoViagem": "REGULAR",
                     "totalKm": 18.071618726313545,
                     "totalTempo": 1440,
                     "totalBilhetes": 7,
                     "totalParadas": 6
                 }
             ],
             "jornada": [
                 {
                     "_id": "2017-04-02",
                     "totalHoras": 0,
                     "jornadaMotoristas":[
                         {"cpfMotorista":"121613","duracao":20}
                     ],
                     "cpfMotoristas": [
                         "121613"
                     ]
                 }
             ],
             "totalizadores": [
                 {
                     "_id": "2017-04-02",
                     "totalQuilometragem": 18.071618726313545,
                     "totalBilhetes": 7,
                     "totalParadas": 6,
                     "totalTempo": 1440,
                     "direcaoContinuaMaxima": 30,
                     "direcaoContinua":{
                         "motoristas": [
                             "121613"
                         ],
                         "direcoes":[
                             {"motorista":"121613","direcaoContinuaMaxima":10}
                         ]
                     },
                     "paradas":{
                         "ocorrenciasDeParadas":[
                             "SOLICITACAO_DE_PASSAGEIRO"
                         ],
                         "motivo":[
                             "SOLICITACAO_DE_PASSAGEIRO"
                         ]
                     }
                 }
             ]
         });


         return defer.promise;

        /*return new Promise((resolve,reject) => {
            resolve({
                "viagens": [
                    {
                        "_id": "1",
                        "descricaoLinha": null,
                        "tipoViagem": "REGULAR",
                        "totalKm": 18.071618726313545,
                        "totalTempo": 1440,
                        "totalBilhetes": 7,
                        "totalParadas": 6
                    }
                ],
                "jornada": [
                    {
                        "_id": "2017-04-02",
                        "totalHoras": 0,
                        "jornadaMotoristas":[
                            {"cpfMotorista":"121613","duracao":20}
                        ],
                        "cpfMotoristas": [
                            "121613"
                        ]
                    }
                ],
                "totalizadores": [
                    {
                        "_id": "2017-04-02",
                        "totalQuilometragem": 18.071618726313545,
                        "totalBilhetes": 7,
                        "totalParadas": 6,
                        "totalTempo": 1440,
                        "direcaoContinuaMaxima": 30,
                        "direcaoContinua":{
                            "motoristas": [
                                "121613"
                            ],
                            "direcoes":[
                                {"motorista":"121613","direcaoContinuaMaxima":10}
                            ]
                        },
                        "paradas":{
                            "ocorrenciasDeParadas":[
                                "SOLICITACAO_DE_PASSAGEIRO"
                            ],
                            "motivo":[
                                "SOLICITACAO_DE_PASSAGEIRO"
                            ]
                        }
                    }
                ]
            });
        }); */
    }
}

PainelService.$inject = ['$http',"$q"];

angular.module('monitriip-web')
        .service('PainelService',PainelService);

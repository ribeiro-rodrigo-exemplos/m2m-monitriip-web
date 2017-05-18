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
                        dias:[
                            {    "data":"2017-04-03",
                                "viagens":[
                                        {
                                        "_id": "1",
                                        "descricaoLinha": "Rio de Janeiro x Resende",
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 18.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 17,
                                        "totalParadas" : 30
                                        },
                                        {
                                        "_id": "2",
                                        "descricaoLinha": "Rio de Janeiro x Petrópolis",
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 12.071618726313545,
                                        "totalTempo": 1240,
                                        "totalBilhetes": 35,
                                        "totalParadas" : 23
                                        },
                                        {
                                        "_id": "3",
                                        "descricaoLinha": "Lumiar X Rio de Janeiro",
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 19.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 20,
                                        "totalParadas" : 19
                                        }
                                ],
                                "jornadas":[
                                        {
                                            "motorista": "121613",
                                            "duracao": 180
                                        },
                                        {
                                            "motorista": "121614",
                                            "duracao": 120
                                        }
                                
                                    ],
                                    "direcoes":[
                                            {
                                            "motorista": "121613",
                                            "direcaoContinuaMaxima": 30
                                            },
                                            {
                                            "motorista": "121614",
                                            "direcaoContinuaMaxima": 8
                                            }
                                    ],
                                    "paradas":[
                                            {
                                                motivo:"SOLICITACAO_DE_PASSAGEIRO"
                                            },
                                            {
                                                motivo:"SOLICITACAO_DE_PASSAGEIRO"
                                            },
                                            {
                                                motivo:"SOLICITACAO_DE_PASSAGEIRO"
                                            },
                                            {
                                                motivo:"PARADA PROGRAMADA"
                                            },
                                            {
                                                motivo:"PARADA PROGRAMADA"
                                            }
                                    ], 
                                    "totalizadores":{      
                                        "totalQuilometragem": 18.071618726313545,
                                        "totalBilhetes": 17,
                                        "totalTempo": 1440,
                                        "totalParadas":20,
                                        "totalJornadas":100,
                                        "totalDirecao" : 56
                                    }

                            },
                            {    "data":"2017-04-04",
                                "viagens":[
                                        {
                                        "_id": "1",
                                        "descricaoLinha": "Rio de Janeiro x Teresópolis",
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 25.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 17,
                                        "totalParadas" : 5
                                        },
                                        {
                                        "_id": "2",
                                        "descricaoLinha": "Rio de Janeiro x Itatiaia",
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 25.071618726313545,
                                        "totalTempo": 1240,
                                        "totalBilhetes": 35,
                                        "totalParadas" : 15
                                        },
                                        {
                                        "_id": "3",
                                        "descricaoLinha": "Rio de Janeiro x Penedo",
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 19.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 20,
                                        "totalParadas" : 10
                                        }
                                ],
                                "jornadas":[
                                        {
                                            "motorista": "121613",
                                            "duracao": 250
                                        },
                                        {
                                            "motorista": "121614",
                                            "duracao": 150
                                        }
                                
                                    ],
                                    "direcoes":[
                                            {
                                            "motorista": "121613",
                                            "direcaoContinuaMaxima": 60
                                            },
                                            {
                                            "motorista": "121614",
                                            "direcaoContinuaMaxima": 2
                                            }
                                    ],
                                    "paradas":[
                                            {
                                                motivo:"SOLICITACAO_DE_PASSAGEIRO"
                                            },
                                            {
                                                motivo:"PARADA PROGRAMADA"
                                            }
                                    ], 
                                    "totalizadores":{      
                                        "totalQuilometragem": 30.071618726313545,
                                        "totalBilhetes": 13,
                                        "totalTempo": 900,
                                        "totalParadas":80,
                                        "totalJornadas":10,
                                        "totalDirecao" : 64
                                    }

                            }], 
                            "paradasCombo":[
                                    "SOLICITACAO_DE_PASSAGEIRO",
                                    "PARADA PROGRAMADA"
                                ], 
                            "motoristasCombo":[
                                    "121613",
                                    "121614"
                                ],
                            });

         return defer.promise;
      
    }
}

PainelService.$inject = ['$http',"$q"];

angular.module('monitriip-web')
        .service('PainelService',PainelService);

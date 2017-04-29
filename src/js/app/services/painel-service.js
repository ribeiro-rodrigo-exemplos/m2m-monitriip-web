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

        //  defer.resolve({
        //      "viagens": [
        //          {
        //              "_id": "1",
        //              "descricaoLinha": "Rio de Janeiro x Petrópolis",
        //              "tipoViagem": "REGULAR",
        //              "totalKm": 18.071618726313545,
        //              "totalTempo": 1440,
        //              "totalBilhetes": 7,
        //              "totalParadas": 6
        //          },
        //          {
        //              "_id": "2",
        //              "descricaoLinha": "Madureira x Alvorada",
        //              "tipoViagem": "REGULAR",
        //              "totalKm": 12.071618726313545,
        //              "totalTempo": 540,
        //              "totalBilhetes": 13,
        //              "totalParadas": 19
        //          }
        //      ],
        //      "jornadas": [
        //          {
        //              "_id": "2017-04-02",
        //              "jornadaMotoristas":[
        //                  {"cpfMotorista":"121613","duracao":20},
        //                  {"cpfMotorista":"121613","duracao":80}
        //              ],
        //              "cpfMotoristas": [
        //                  "121613"
        //              ]
        //          },
        //          {
        //              "_id": "2017-04-03",
        //              "jornadaMotoristas":[
        //                  {"cpfMotorista":"121613","duracao":140},
        //                  {"cpfMotorista":"121613","duracao":60}
        //              ],
        //              "cpfMotoristas": [
        //                  "121613"
        //              ]
        //          }
        //      ],
        //      "totalizadores": [
        //         {
        //             "_id": "2017-04-02",
        //             "totalQuilometragem": 2.015354,
        //             "totalBilhetes": 3,
        //             "totalTempo": 560,
        //             "motoristas": [
        //                 {
        //                 "motorista": "121613"
        //                 }
        //             ],
        //             "direcoes": [
        //                 {
        //                 "motorista": "121613",
        //                 "direcaoContinuaMaxima": 30
        //                 },
        //                 {
        //                 "motorista": "121613",
        //                 "direcaoContinuaMaxima": 2
        //                 },
        //                 {
        //                 "motorista": "121613",
        //                 "direcaoContinuaMaxima": 32
        //                 }
        //             ],
        //             "motivoParadas": [
        //                 [
        //                 "SOLICITACAO_DE_PASSAGEIRO",
        //                 "SOLICITACAO_DE_PASSAGEIRO"
        //                 ],
        //                 []
        //             ]
        //         },
        //         {
        //             "_id": "2017-04-03",
        //             "totalQuilometragem": 18.071618726313545,
        //             "totalBilhetes": 7,
        //             "totalTempo": 1440,
        //             "motoristas": [
        //                 {
        //                 "motorista": "121613"
        //                 }
        //             ],
        //             "direcoes": [
        //                 {
        //                 "motorista": "121613",
        //                 "direcaoContinuaMaxima": 40
        //                 },
        //                 {
        //                 "motorista": "121613",
        //                 "direcaoContinuaMaxima": 6
        //                 },
        //                 {
        //                 "motorista": "121613",
        //                 "direcaoContinuaMaxima": 34
        //                 }
        //             ],
        //             "motivoParadas": [
        //                 [
        //                 "SOLICITACAO_DE_PASSAGEIRO",
        //                 "SOLICITACAO_DE_PASSAGEIRO"
        //                 ],
        //                 []
        //             ]
        //         }
        //     ]
        //  });

        defer.resolve({
                        dias:[
                            {    "data":"2017-04-03",
                                "viagens":[
                                        {
                                        "_id": "1",
                                        "descricaoLinha": null,
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 18.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 17
                                        },
                                        {
                                        "_id": "2",
                                        "descricaoLinha": null,
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 12.071618726313545,
                                        "totalTempo": 1240,
                                        "totalBilhetes": 35
                                        },
                                        {
                                        "_id": "3",
                                        "descricaoLinha": null,
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 19.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 20
                                        }
                                ],
                                "jornadas":[
                                        {
                                            "motorista": "213456",
                                            "duracao": 180
                                        },
                                        {
                                            "motorista": "12345",
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
                                        "totalQuilometragem": 18.071618726313545,
                                        "totalBilhetes": 17,
                                        "totalTempo": 1440,
                                        "totalParadas":20,
                                        "totalJornadas":100
                                    }

                            },
                            {    "data":"2017-04-04",
                                "viagens":[
                                        {
                                        "_id": "1",
                                        "descricaoLinha": null,
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 25.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 17
                                        },
                                        {
                                        "_id": "2",
                                        "descricaoLinha": null,
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 25.071618726313545,
                                        "totalTempo": 1240,
                                        "totalBilhetes": 35
                                        },
                                        {
                                        "_id": "3",
                                        "descricaoLinha": null,
                                        "tipoViagem": "REGULAR",
                                        "totalKm": 19.071618726313545,
                                        "totalTempo": 1440,
                                        "totalBilhetes": 20
                                        }
                                ],
                                "jornadas":[
                                        {
                                            "motorista": "213456",
                                            "duracao": 250
                                        },
                                        {
                                            "motorista": "12345",
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
                                        "totalJornadas":100
                                    }

                            }], 
                            "paradasCombo":[
                                    "SOLICITACAO_DE_PASSAGEIRO",
                                    "PARADA PROGRAMADA"
                                ], 
                            "motoristasCombo":[
                                    "213456",
                                    "12345"
                                ],
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

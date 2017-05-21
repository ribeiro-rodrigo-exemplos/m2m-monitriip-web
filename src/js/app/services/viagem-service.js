class ViagemService{
    constructor(httpClient,promise){
        this._httpClient = httpClient;
        this._promise = promise;
    }

    obterExtratosDeViagensPorPeriodo(dataInicial,dataFinal,cnpjCliente,cpfMotorista,placaVeiculo){
        let query = {};

        if(cpfMotorista)
            query.cpfMotorista = cpfMotorista;
        
        if(placaVeiculo)
            query.placaVeiculo = placaVeiculo;
        
        if(cnpjCliente)
            query.cnpjCliente = cnpjCliente;
        
        query.dataInicial = dataInicial;
        query.dataFinal = dataFinal;
        
        return this._httpClient
                    .get("http://localhost:3009/v1/viagens/extratos",{params:query})
                    .then(response => response.data);

    }

    obterViagemPorId(id){
         
        let defer = this._promise.defer();

        defer.resolve({
                        "_id": "58fe36dd1f86090418242fd8",
                        "idViagem": "1",
                        "idTransbordo": "trans01",
                        "identificacaoLinha": "625",
                        "dataInicial": "2017-04-02",
                        "pdop" : "123",
                        "imei" : "321654",
                        "cpfMotorista": "121613",
                        "placaVeiculo": "CCCA",
                        "descricaoDaLinha": "Parque Manibura/Borges de Melo",
                        "idCliente": "209",
                        "tipoViagem": "REGULAR",
                        "tipoTransporte": "REGULAR",
                        "sentidoLinha": "IDA",
                        "veiculos": [
                            1234,
                            4321,
                            4532
                        ],
                        "motoristas": [
                            15697589964,
                            96684523361,
                            13358498520
                        ],  
                        "localizacaoInicial": {
                            "type": "POINT",
                            "coordinates": [
                                -22.906847,
                                -43.172896
                            ]
                        },
                        "totalBilhetes": 1508,
                        "totalParadas": 106,
                        "totalKm": 14.071618726313545,
                        "velocidadeMaxima": 330,
                        "velocidadeMinima": 330,
                        "direcaoContinuaMaxima": 30,
                        "paradas": [
                            {
                                "motivoParada": "SOLICITACAO_DE_PASSAGEIRO",
                                "dataHora": "2017-04-01 05:39:00",
                                "localizacao": {
                                    "type": "POINT",
                                    "coordinates": [
                                        -22.906847,
                                        -43.172896
                                    ]
                                }
                            },
                            {
                                "motivoParada": "PARADA_PROGRAMADA",
                                "dataHora": "2017-04-01 05:39:00",
                                "localizacao": {
                                    "type": "POINT",
                                    "coordinates": [
                                        -22.904347,
                                        -43.110825
                                    ]
                                }
                            }
                        ],
                        "bilhetes": [
                            {
                                "idViagem": "1",
                                "idTransbordo": "trans01",
                                "dataHoraEvento": "2017-04-01 05:00:00",
                                "numeroEquipamento": "2017-04-01 05:00:00",
                                "numeroBilheteEmbarque": "01011",
                                "identificacaoLinha": "623",
                                "dataPrevistaViagem": "2017-04-23",
                                "horaPrevistaViagem": "12:02:00",
                                "codigoDesconto": "111",
                                "valorTarifa": 2.4,
                                "percentualDesconto": 12,
                                "celularPassageiro": "92117478",
                                "imei": "444",
                                "localizacao": {
                                    "type": "POINT",
                                    "coordinates": [
                                        -22.906847,
                                        -43.172896
                                    ]
                                }
                            },
                            {
                                "idViagem": "1",
                                "idTransbordo": "trans01",
                                "dataHoraEvento": "2017-04-02 05:00:00",
                                "numeroEquipamento": "2017-04-01 05:00:00",
                                "numeroBilheteEmbarque": "02022",
                                "identificacaoLinha": "623",
                                "dataPrevistaViagem": "2017-04-23",
                                "horaPrevistaViagem": "12:02:00",
                                "codigoDesconto": "111",
                                "valorTarifa": 3.9,
                                "percentualDesconto": 12,
                                "celularPassageiro": "92117478",
                                "imei": "444",
                                "localizacao": {
                                    "type": "POINT",
                                    "coordinates": [
                                        -22.906847,
                                        -43.172896
                                    ]
                                }
                            }
                        ],
                        "localizacoes": [
                            {
                                "dataHoraLocalizacao": "2017-04-01 02:00:00",
                                "velocidade": 330,
                                "distanciaPercorrida": 14.071618726313545,
                                "situacaoIgnicaoMotor": "LIGADA",
                                "situacaoPortaVeiculo": "FECHADA",
                                "localizacao": {
                                "type": "POINT",
                                "coordinates": [
                                    -22.834171,
                                    -43.285343
                                ]
                                }
                            },
                            {
                                "dataHoraLocalizacao": "2017-04-01 02:00:00",
                                "velocidade": 70,
                                "distanciaPercorrida": 14.071618726313545,
                                "situacaoIgnicaoMotor": "LIGADA",
                                "situacaoPortaVeiculo": "FECHADA",
                                "localizacao": {
                                "type": "POINT",
                                "coordinates": [
                                    -22.834171,
                                    -43.285343
                                ]
                                }
                            }
                        ],
                        "dataFinal": "2017-04-03",
                        "duracao": 1440,
                        "localizacaoFinal": {
                        "type": "POINT",
                        "coordinates": [
                            -22.906847,
                            -43.172896
                        ]
                        },
                        "cnpjCliente": "33179290001493",
                        "aberto": false
            });

            return defer.promise;
    }
}

ViagemService.$inject = ['$http','$q'];

angular.module('monitriip-web')
        .service('ViagemService',ViagemService);
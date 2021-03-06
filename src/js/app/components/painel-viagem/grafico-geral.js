/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class GraficoGeral{
    constructor(eventBus){
        this.totalizadorDirecaoContinua = [];
        this.totalizadorJornada = [];
        this.totalizadorKmPercorrido = [];
        this.totalizadorLeituraBilhetes = [];
        this.mediaTempoViagem = [];
        
        this._dateUtil = new DateUtil();
        eventBus.on('event:painel:components:updated',this._atualizar.bind(this));

        this._grafico = {
            credits:false,
            chart: {
                backgroundColor: 'transparent',
                renderTo: 'container',
                type: 'column'
            },
            colors: ['#0bb48d', '#cb3f7e','#358fcd','#9157ab','#ec6051','#e18e18'],
            title: {
                text: ""
            },
            subtitle: {
                text: ""
            },
            legend: {
                itemStyle: {
                    color: "#95ca31"
                },
                itemHoverStyle: {
                    color: "#ccc"
                },
                itemHiddenStyle: {
                    color: "#ccc"
                }
            },
             yAxis: {
                title: {
                    text: ''
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                gridLineColor: 'transparent',
                labels: {
                    enabled: false
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            xAxis:{
                lineColor: 'transparent',
                minorGridLineColor: 'transparent',
                tickColor: 'yellow',
                labels: {
                    enabled: true,
                    style: {
                        color: 'white'
                    }
                },
                categories:[],
                gridLineColor: 'transparent'
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
           plotOptions: {
            series:{
                shadow:false,
                borderWidth:0.1,
                pointPadding:0.1,
                groupPadding:0
                }    
            },
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#fff'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },
            series: []
        };

    }
    
    criarGrafico(data){
        this._grafico.series.push(data);
        
    }

    criaCabecalhoGrafico(cabecalho){
        this._grafico.xAxis.categories=cabecalho.map(data => this.formatarData(data));
    }

    formatarData(data){
        return this._dateUtil.obterDiaEMes(data);
    }

    get render(){
        return this._grafico;
    }

    _atualizar(dados){
        this.criarGrafico(this.totalizadorKmPercorrido);
        this.criarGrafico(this.totalizadorLeituraBilhetes);
        this.criarGrafico(this.mediaTempoViagem);
        this.criarGrafico(this.totalizadorDirecaoContinua);
        this.criarGrafico(this.totalizadorJornada);
        this.criarGrafico(this.totalizadorParadas);
        this.criaCabecalhoGrafico(dados.datas);
    }
}

GraficoGeral.$inject = ['EventBusService'];

angular.module('monitriip-web')
        .service('GraficoGeral',GraficoGeral);
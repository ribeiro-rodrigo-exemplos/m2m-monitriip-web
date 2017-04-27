/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class GraficoGeral{
    constructor(){
        
        this._dateUtil = new DateUtil();

        this._grafico = {
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
                tickColor: 'transparent',
                title: {
                    style: {
                        color: '#e18e18'

                    }
                },
                 labels: {
                    enabled: true,
                    style: {
                        color: '#ec6051'
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
                        color: '#CCC'
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
        
            series: [{
                showInLegend: false,
                data: []
            }]
        };

        
    }
        

    criarGrafico(data){
        this.grafico.series[0].data = data;
        this.grafico.series[0].xAxis = data.dia;
    }

    formatarData(data){
        return this._dateUtil.obterDiaEMes(data);
    }

    atualizar(event){
        
        this.datas = event.totalizadores.map(totalizador => {
            dia = this.formatarData(jornada._id);

            let duracaoTotal = 0;

            jornada.jornadaMotoristas.forEach(jornadaMotorista =>{
                duracaoTotal = duracaoTotal + jornadaMotorista.duracao;
            });

            return {dia:dia,total:duracaoTotal};
        });

        this.criarGrafico(this.datas.map(data => data.total));

    }

    get render(){
        return this._grafico;
    }
}

angular.module('monitriip-web')
        .service('GraficoGeral',GraficoGeral);
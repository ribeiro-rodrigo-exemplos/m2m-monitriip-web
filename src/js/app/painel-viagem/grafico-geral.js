/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class GraficoGeral{
    constructor(){
        this._grafico = {
            chart: {
                type: 'area',
                spacingBottom: 30,
                backgroundColor: 'transparent'
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            title: {
                text: null
            },
            xAxis: {
                tickmarkplacement:"on",
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0,
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: ''
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                gridLineColor: 'transparent',
                labels: {
                    enabled: false
                }
            },

            plotOptions: {
                series: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgb(10,133,104)'], //dark green
                            [1, 'rgb(17,202,158)'] //light green
                        ]
                    },
                    lineWidth: 0,
                    lineColor: 'rgb(17,202,158)',
                    marker: {
                        fillColor: 'rgb(17,202,158)',
                        lineWidth: 2,
                        lineColor: "#FFFFFF"
                    }
                },
                area: {
                    dataLabels: {
                        enabled: true,
                        color: "#FFFFFF"
                    },
                    enableMouseTracking: true
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                showInLegend: false,
                name: 'Km Percorrido',
                data: [35,10,25],
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000
            }]
        };
    }

    get render(){
        return this._grafico;
    }
}

angular.module('monitriip-web')
        .service('GraficoGeral',GraficoGeral);
/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class Totalizador{
    constructor(){
        this._grafico = {
            chart: {
                backgroundColor: 'transparent',
                margin: [0, 30, 20, 30],
            },
            title: {
                text: ''
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

            xAxis:{
                tickmarkplacement:"on",
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0,
                type: 'datetime',
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    color: '#0bb48d',
                    enableMouseTracking: false,
                    pointStart: null,
                    pointInterval: 24 * 3600 * 1000,
                    marker: {
                        fillColor: null,
                        lineWidth: 2,
                        lineColor: "#FFFFFF"
                    }
                }
            },
            series: [{
                showInLegend: false,
                name: 'Km Percorrido',
                data: []
            }]
        };
    }

    get grafico(){
        return this._grafico;
    }



}

angular.module('monitriip-web')
        .service('Totalizador',Totalizador);
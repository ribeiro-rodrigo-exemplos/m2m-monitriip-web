/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class Totalizador{
    constructor(){

        this._dateUtil = new DateUtil();

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
                    color: '',
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

    criarGrafico(data){

        this.grafico.series[0].data = data;
    }

    formatarData(data){
        return this._dateUtil.obterDiaEMes(data);
    }

    formatarNumero(numero,fixade){
        return parseFloat(numero).toFixed(fixade === undefined ? 2:fixade);
    }

    atualizar(event){
        throw new Error('É preciso implementar o método atualizar');
    }

    trocarCorLinhaGrafico(cor){
        this._grafico.plotOptions.series.color = cor;
    }

    get grafico(){
        return this._grafico;
    }
}

angular.module('monitriip-web')
        .service('Totalizador',Totalizador);
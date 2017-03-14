var chart = Highcharts.chart('container-highcharts', 
    {
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
});

var chart2 = Highcharts.chart('container-highcharts2', 
    {
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
                        [0, 'rgb(153,50,97)'], //dark pink
                        [1, 'rgb(233,105,162)'] //light pink
                    ]
                },
                lineWidth: 0,
                lineColor: 'rgb(233,105,162)',
                marker: {
                    fillColor: 'rgb(233,105,162)',
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
            name: 'Leitura de Bilhetes',
            data: [497,498,497],
            //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
            pointStart: Date.UTC(2017, 1, 2),
            //1 dia de intervalo
            pointInterval: 24 * 3600 * 1000
        }]
});

var chart3 = Highcharts.chart('container-highcharts3', 
    {
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
                        [0, 'rgb(42,109,152)'], //dark blue
                        [1, 'rgb(120,188,233)'] //light blue
                    ]
                },
                lineWidth: 0,
                lineColor: 'rgb(120,188,233)',
                marker: {
                    fillColor: 'rgb(120,188,233)',
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
            name: 'Tempo de Viagem',
            data: [155,156,150],
            //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
            pointStart: Date.UTC(2017, 1, 2),
            //1 dia de intervalo
            pointInterval: 24 * 3600 * 1000
        }]
});

var chart4 = Highcharts.chart('container-highcharts4', 
    {
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
                        [0, 'rgb(102,61,121)'], //dark purple
                        [1, 'rgb(204,133,235)'] //light purple
                    ]
                },
                lineWidth: 0,
                lineColor: 'rgb(204,133,235)',
                marker: {
                    fillColor: 'rgb(204,133,235)',
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
            name: 'Direção Contínua',
            data: [7,9,7],
            //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
            pointStart: Date.UTC(2017, 1, 2),
            //1 dia de intervalo
            pointInterval: 24 * 3600 * 1000
        }]
});

var chart5 = Highcharts.chart('container-highcharts5', 
{
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
                        [0, 'rgb(175,72,63)'], //dark red
                        [1, 'rgb(235,141,131)'] //light red
                    ]
                },
                lineWidth: 0,
                lineColor: 'rgb(235,141,131)',
                marker: {
                    fillColor: 'rgb(235,141,131)',
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
            name: 'Jornada de Trabalho',
            data: [90,115,105],
            //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
            pointStart: Date.UTC(2017, 1, 2),
            //1 dia de intervalo
            pointInterval: 24 * 3600 * 1000
        }]
});

var chart6 = Highcharts.chart('container-highcharts6', 
{
        chart: {
            type: 'area',
            backgroundColor: 'transparent',
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
                        [0, 'rgb(173,110,17)'], //dark orange
                        [1, 'rgb(234,165,64)'] //light orange
                    ]
                },
                lineWidth: 0,
                lineColor: 'rgb(234,165,64)',
                marker: {
                    fillColor: 'rgb(234,165,64)',
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
            name: 'Detector de Paradas',
            data: [90,115,105],
            //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
            pointStart: Date.UTC(2017, 1, 2),
            //1 dia de intervalo
            pointInterval: 24 * 3600 * 1000
        }]
});

var infoBoxChart1 = Highcharts.chart('info-box-chartdiv', 
{
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
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000,
                marker: {
                    fillColor: null,//inherit color from series
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Km Percorrido',
            data: [35, 10, 25]
        }]

});

var infoBoxChart2 = Highcharts.chart('info-box-chartdiv2', 
{
        chart: {
            backgroundColor: 'transparent',
            margin: [0, 30, 20, 30]
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
            lineColor: 'transparent',
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
                color: "#cb3f7e",
                enableMouseTracking: false,
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000,
                marker: {
                    fillColor: null,//inherit color from series
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Leitura de Bilhetes',
            data: [497, 498, 497]
        }]

});

var infoBoxChart3 = Highcharts.chart('info-box-chartdiv3', 
{
        chart: {
            backgroundColor: 'transparent',
            margin: [0, 30, 20, 30]
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
            lineColor: 'transparent',
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
                enableMouseTracking: false,
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000,
                color: "#358fcd",
                marker: {
                    fillColor: null,//inherit color from series
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Tempo de Viagem',
            data: [155, 156, 150],
        }]

});

var infoBoxChart4 = Highcharts.chart('info-box-chartdiv4', 
{
        chart: {
            backgroundColor: 'transparent',
            margin: [0, 30, 20, 30]
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
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: {
               enabled: false
            }
        },

        xAxis:{
            tickmarkplacement:"on",
            lineWidth: 0,
            minorGridLineWidth: 4,
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
                enableMouseTracking: false,
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000,
                color: "#9157ab",
                marker: {
                    fillColor: null,//inherit color from series
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Direção Contínua',
            data: [7, 9, 7]
        }]

});

var infoBoxChart5 = Highcharts.chart('info-box-chartdiv5', 
{
        chart: {
            backgroundColor: 'transparent',
            margin: [0, 30, 20, 30]
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
            lineColor: 'transparent',
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
                enableMouseTracking: false,
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000,
                color: "#ec6051",
                marker: {
                    fillColor: null,//inherit color from series
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Jornada de Trabalho',
            data: [90,115, 105]
        }]
});

var infoBoxChart6 = Highcharts.chart('info-box-chartdiv6', 
{
        chart: {
            backgroundColor: 'transparent',
            margin: [0, 30, 20, 30]
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
            lineColor: 'transparent',
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
                enableMouseTracking: false,
                //Ano, Mês, Dia - lembrando que para este fim Janeiro é mês 0, Fevereiro mês 1, etc
                pointStart: Date.UTC(2017, 1, 2),
                //1 dia de intervalo
                pointInterval: 24 * 3600 * 1000,
                color: "#e18e18",
                marker: {
                    fillColor: null,//inherit color from series
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Detector de Paradas',
            data: [90, 115, 105]
        }]
});
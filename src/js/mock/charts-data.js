// since v3, chart can accept data in JSON format
// if your category axis parses dates, you should only
// set date format of your data (dataDateFormat property of AmSerialChart)

//talvez haja uma forma menos repetitiva de se fazer os gráficos, verifiquem se conseguem por favor

//CHARTS PRINCIPAIS (main-chart)

//km Percorrido
var chartData = [
    {
        "lineColor": "#11ca9ef",	//light_green
        "fillColor": "#0bb48d", //green
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "km": 35
    },
    {
        "date": "2017-02-03",
        "km": 10
    },
    {
        "date": "2017-02-04",
        "km": 25
    }
    ];
var chart;

AmCharts.ready(function () {
    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;

    chart.categoryField = "date";
    chart.dataDateFormat = "YYYY-MM-DD";

	chart.marginTop = 0;
	chart.marginBottom = 0;
	chart.marginLeft = 0;
	chart.marginRight = 0;
	chart.pullOutRadius = 0;

    var balloon = chart.balloon;
    balloon.enabled = false;

    // AXIS
    // category axis
    var categoryAxis = chart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // we want custom date formatting, so we change it in next line
    
    // precisamos do mês descrito + abreviado no gráfico (Fev, Mar, Abr, etc), por favor formatem isso melhor
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    // as we have data of different units, we create two different value axes

    // km value axis
    var kmAxis = new AmCharts.ValueAxis();
    //kmAxis.gridAlpha = 0;
    kmAxis.axisAlpha = 0;
    kmAxis.labelsEnabled = false;
    kmAxis.km = "km";
    chart.addValueAxis(kmAxis);


    // GRAPHS
    // km graph
    var kmGraph = new AmCharts.AmGraph();
    kmGraph.title = "km";
    kmGraph.valueField = "km";
    kmGraph.type = "line";
    kmGraph.valueAxis = kmAxis; // indicate which axis should be used
    kmGraph.lineColorField = "lineColor";
    kmGraph.fillColorsField = "fillColor";
    kmGraph.labelColorField = "#ffffff";
    kmGraph.fillAlphas = 0.9;
    kmGraph.labelText = "[[km]]";
    kmGraph.color = "#899b9b";
    kmGraph.lineThickness = 1;
    kmGraph.legendColor = "#ffffff";
    kmGraph.bullet = "circle";
    kmGraph.bulletBorderColor = "#ffffff";
    kmGraph.bulletBorderThickness = 2;
    kmGraph.bulletBorderAlpha = 1;
    kmGraph.bulletSize = 9;
    chart.addGraph(kmGraph);

	// function() {
 //      chart.categoryAxis.zoomToValues(10, 25);
 //    }

    // WRITE
    chart.write("chartdiv");

//       function zoomChart() {
	//     chart.zoomToDates(new Date(2017, 0, 2), new Date(2017, 0, 1));
	// }
});

//Leitura de Bilhetes
var chartData2 = [
    {
        "lineColor": "#e96922", //light_pink
        "fillColor": "#cb3f7e", //pink
        "date": "2017-02-02",
        "bilhetes": 497
    },
    {
        "date": "2017-02-03",
        "bilhetes": 498
    },
    {
        "date": "2017-02-04",
        "bilhetes": 497
    }
    ];
var chart2;

AmCharts.ready(function () {
    // SERIAL CHART
    chart2 = new AmCharts.AmSerialChart();
    chart2.dataProvider = chartData2;

    chart2.categoryField = "date";
    chart2.dataDateFormat = "YYYY-MM-DD";

    chart2.marginTop = 0;
    chart2.marginBottom = 0;
    chart2.marginLeft = 0;
    chart2.marginRight = 0;
    chart2.pullOutRadius = 0;

    var balloon = chart2.balloon;
    balloon.enabled = false;

    // AXIS
    // category axis
    var categoryAxis = chart2.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // as we have data of different units, we create two different value axes

    //renomeiem as variáveis se acharem melhor

    // km value axis
    var bilhetesAxis = new AmCharts.ValueAxis();
    //kmAxis.gridAlpha = 0;
    bilhetesAxis.axisAlpha = 0;
    bilhetesAxis.labelsEnabled = false;
    bilhetesAxis.km = "bilhetes";
    chart2.addValueAxis(bilhetesAxis);


    // GRAPHS
    // km graph
    var bilhetesGraph = new AmCharts.AmGraph();
    bilhetesGraph.title = "bilhetes";
    bilhetesGraph.valueField = "bilhetes";
    bilhetesGraph.type = "line";
    bilhetesGraph.valueAxis = bilhetesAxis; // indicate which axis should be used
    bilhetesGraph.lineColorField = "lineColor";
    bilhetesGraph.fillColorsField = "fillColor";
    bilhetesGraph.labelColorField = "#ffffff";
    bilhetesGraph.fillAlphas = 0.9;
    bilhetesGraph.labelText = "[[km]]";
    bilhetesGraph.color = "#899b9b";
    bilhetesGraph.lineThickness = 1;
    bilhetesGraph.legendColor = "#ffffff";
    bilhetesGraph.bullet = "circle";
    bilhetesGraph.bulletBorderColor = "#ffffff";
    bilhetesGraph.bulletBorderThickness = 2;
    bilhetesGraph.bulletBorderAlpha = 1;
    bilhetesGraph.bulletSize = 9;
    chart2.addGraph(bilhetesGraph);

    // function() {
 //      chart.categoryAxis.zoomToValues(10, 25);
 //    }

    // WRITE
    chart2.write("chartdiv-2");

//       function zoomChart() {
    //     chart.zoomToDates(new Date(2017, 0, 2), new Date(2017, 0, 1));
    // }
});

//Tempo de Viagem
var chartData3 = [
    {
        "lineColor": "#78bce9", //light_blue
        "fillColor": "#358fcd", //blue
        "date": "2017-02-02",
        "tempo": 155
    },
    {
        "date": "2017-02-03",
        "tempo": 156
    },
    {
        "date": "2017-02-04",
        "tempo": 150
    }
    ];
var chart3;

AmCharts.ready(function () {
    // SERIAL CHART
    chart3 = new AmCharts.AmSerialChart();
    chart3.dataProvider = chartData3;

    chart3.categoryField = "date";
    chart3.dataDateFormat = "YYYY-MM-DD";

    chart3.marginTop = 0;
    chart3.marginBottom = 0;
    chart3.marginLeft = 0;
    chart3.marginRight = 0;
    chart3.pullOutRadius = 0;

    var balloon = chart3.balloon;
    balloon.enabled = false;

    // AXIS
    // category axis
    var categoryAxis = chart3.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // as we have data of different units, we create two different value axes

    //renomeiem as variáveis se acharem melhor

    // km value axis
    var tempoAxis = new AmCharts.ValueAxis();
    //kmAxis.gridAlpha = 0;
    tempoAxis.axisAlpha = 0;
    tempoAxis.labelsEnabled = false;
    tempoAxis.km = "tempo";
    chart3.addValueAxis(tempoAxis);


    // GRAPHS
    // km graph
    var tempoGraph = new AmCharts.AmGraph();
    tempoGraph.title = "tempo";
    tempoGraph.valueField = "tempo";
    tempoGraph.type = "line";
    tempoGraph.valueAxis = tempoAxis; // indicate which axis should be used
    tempoGraph.lineColorField = "lineColor";
    tempoGraph.fillColorsField = "fillColor";
    tempoGraph.labelColorField = "#ffffff";
    tempoGraph.fillAlphas = 0.9;
    tempoGraph.labelText = "[[km]]";
    tempoGraph.color = "#899b9b";
    tempoGraph.lineThickness = 1;
    tempoGraph.legendColor = "#ffffff";
    tempoGraph.bullet = "circle";
    tempoGraph.bulletBorderColor = "#ffffff";
    tempoGraph.bulletBorderThickness = 2;
    tempoGraph.bulletBorderAlpha = 1;
    tempoGraph.bulletSize = 9;
    chart3.addGraph(tempoGraph);

    // function() {
 //      chart.categoryAxis.zoomToValues(10, 25);
 //    }

    // WRITE
    chart3.write("chartdiv-3");

//       function zoomChart() {
    //     chart.zoomToDates(new Date(2017, 0, 2), new Date(2017, 0, 1));
    // }
});

//Direção Contínua
var chartData4 = [
    {
        "lineColor": "#cc86e9", //light_purple
        "fillColor": "#9157ab", //purple
        "date": "2017-02-02",
        "horas": 7
    },
    {
        "date": "2017-02-03",
        "horas": 9
    },
    {
        "date": "2017-02-04",
        "horas": 7
    }
    ];
var chart4;

AmCharts.ready(function () {
    // SERIAL CHART
    chart4 = new AmCharts.AmSerialChart();
    chart4.dataProvider = chartData4;

    chart4.categoryField = "date";
    chart4.dataDateFormat = "YYYY-MM-DD";

    chart4.marginTop = 0;
    chart4.marginBottom = 0;
    chart4.marginLeft = 0;
    chart4.marginRight = 0;
    chart4.pullOutRadius = 0;

    var balloon = chart4.balloon;
    balloon.enabled = false;

    // AXIS
    // category axis
    var categoryAxis = chart4.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // as we have data of different units, we create two different value axes

    //renomeiem as variáveis se acharem melhor

    // km value axis
    var horasAxis = new AmCharts.ValueAxis();
    //kmAxis.gridAlpha = 0;
    horasAxis.axisAlpha = 0;
    horasAxis.labelsEnabled = false;
    horasAxis.km = "horas";
    chart4.addValueAxis(horasAxis);


    // GRAPHS
    // km graph
    var horasGraph = new AmCharts.AmGraph();
    horasGraph.title = "horas";
    horasGraph.valueField = "horas";
    horasGraph.type = "line";
    horasGraph.valueAxis = horasAxis; // indicate which axis should be used
    horasGraph.lineColorField = "lineColor";
    horasGraph.fillColorsField = "fillColor";
    horasGraph.labelColorField = "#ffffff";
    horasGraph.fillAlphas = 0.9;
    horasGraph.labelText = "[[km]]";
    horasGraph.color = "#899b9b";
    horasGraph.lineThickness = 1;
    horasGraph.legendColor = "#ffffff";
    horasGraph.bullet = "circle";
    horasGraph.bulletBorderColor = "#ffffff";
    horasGraph.bulletBorderThickness = 2;
    horasGraph.bulletBorderAlpha = 1;
    horasGraph.bulletSize = 9;
    chart4.addGraph(horasGraph);

    // function() {
 //      chart.categoryAxis.zoomToValues(10, 25);
 //    }

    // WRITE
    chart4.write("chartdiv-4");

//       function zoomChart() {
    //     chart.zoomToDates(new Date(2017, 0, 2), new Date(2017, 0, 1));
    // }
});

//Jornada de Trabalho
var chartData5 = [
    {
        "lineColor": "#eb8d83", //light_red
        "fillColor": "#ec6051", //red
        "date": "2017-02-02",
        "jornada": 90
    },
    {
        "date": "2017-02-03",
        "jornada": 115
    },
    {
        "date": "2017-02-04",
        "jornada": 105
    }
    ];
var chart5;

AmCharts.ready(function () {
    // SERIAL CHART
    chart5 = new AmCharts.AmSerialChart();
    chart5.dataProvider = chartData5;

    chart5.categoryField = "date";
    chart5.dataDateFormat = "YYYY-MM-DD";

    chart5.marginTop = 0;
    chart5.marginBottom = 0;
    chart5.marginLeft = 0;
    chart5.marginRight = 0;
    chart5.pullOutRadius = 0;

    var balloon = chart5.balloon;
    balloon.enabled = false;

    // AXIS
    // category axis
    var categoryAxis = chart5.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // as we have data of different units, we create two different value axes

    //renomeiem as variáveis se acharem melhor

    // km value axis
    var jornadaAxis = new AmCharts.ValueAxis();
    //kmAxis.gridAlpha = 0;
    jornadaAxis.axisAlpha = 0;
    jornadaAxis.labelsEnabled = false;
    jornadaAxis.km = "jornada";
    chart5.addValueAxis(jornadaAxis);


    // GRAPHS
    // km graph
    var jornadaGraph = new AmCharts.AmGraph();
    jornadaGraph.title = "jornada";
    jornadaGraph.valueField = "jornada";
    jornadaGraph.type = "line";
    jornadaGraph.valueAxis = jornadaAxis; // indicate which axis should be used
    jornadaGraph.lineColorField = "lineColor";
    jornadaGraph.fillColorsField = "fillColor";
    jornadaGraph.labelColorField = "#ffffff";
    jornadaGraph.fillAlphas = 0.9;
    jornadaGraph.labelText = "[[km]]";
    jornadaGraph.color = "#899b9b";
    jornadaGraph.lineThickness = 1;
    jornadaGraph.legendColor = "#ffffff";
    jornadaGraph.bullet = "circle";
    jornadaGraph.bulletBorderColor = "#ffffff";
    jornadaGraph.bulletBorderThickness = 2;
    jornadaGraph.bulletBorderAlpha = 1;
    jornadaGraph.bulletSize = 9;
    chart5.addGraph(jornadaGraph);

    // function() {
 //      chart.categoryAxis.zoomToValues(10, 25);
 //    }

    // WRITE
    chart5.write("chartdiv-5");

//       function zoomChart() {
    //     chart.zoomToDates(new Date(2017, 0, 2), new Date(2017, 0, 1));
    // }
});

//Detector de Paradas
var chartData6 = [
    {
        "lineColor": "#eaa540", //light_orange
        "fillColor": "#e18e18", //orange
        "date": "2017-02-02",
        "paradas": 90
    },
    {
        "date": "2017-02-03",
        "paradas": 115
    },
    {
        "date": "2017-02-04",
        "paradas": 105
    }
    ];
var chart6;

AmCharts.ready(function () {
    // SERIAL CHART
    chart6 = new AmCharts.AmSerialChart();
    chart6.dataProvider = chartData6;

    chart6.categoryField = "date";
    chart6.dataDateFormat = "YYYY-MM-DD";

    chart6.marginTop = 0;
    chart6.marginBottom = 0;
    chart6.marginLeft = 0;
    chart6.marginRight = 0;
    chart6.pullOutRadius = 0;

    var balloon = chart6.balloon;
    balloon.enabled = false;

    // AXIS
    // category axis
    var categoryAxis = chart6.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // as we have data of different units, we create two different value axes

    //renomeiem as variáveis se acharem melhor

    // km value axis
    var paradasAxis = new AmCharts.ValueAxis();
    //kmAxis.gridAlpha = 0;
    paradasAxis.axisAlpha = 0;
    paradasAxis.labelsEnabled = false;
    paradasAxis.km = "paradas";
    chart6.addValueAxis(paradasAxis);


    // GRAPHS
    // km graph
    var paradasGraph = new AmCharts.AmGraph();
    paradasGraph.title = "paradas";
    paradasGraph.valueField = "paradas";
    paradasGraph.type = "line";
    paradasGraph.valueAxis = paradasAxis; // indicate which axis should be used
    paradasGraph.lineColorField = "lineColor";
    paradasGraph.fillColorsField = "fillColor";
    paradasGraph.labelColorField = "#ffffff";
    paradasGraph.fillAlphas = 0.9;
    paradasGraph.labelText = "[[km]]";
    paradasGraph.color = "#899b9b";
    paradasGraph.lineThickness = 1;
    paradasGraph.legendColor = "#ffffff";
    paradasGraph.bullet = "circle";
    paradasGraph.bulletBorderColor = "#ffffff";
    paradasGraph.bulletBorderThickness = 2;
    paradasGraph.bulletBorderAlpha = 1;
    paradasGraph.bulletSize = 9;
    chart6.addGraph(paradasGraph);

    // function() {
 //      chart.categoryAxis.zoomToValues(10, 25);
 //    }

    // WRITE
    chart6.write("chartdiv-6");


});

//CHARTS MENORES (info-box)

//km Percorrido
 var infoBoxChartData = [{
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "km": 35
    },
    {
        "date": "2017-02-03",
        "km": 10
    },
    {
        "date": "2017-02-04",
        "km": 25
    }
];
var infoBoxChart;

AmCharts.ready(function () {
    infoBoxChart = new AmCharts.AmSerialChart();
    infoBoxChart.dataProvider = infoBoxChartData;

    infoBoxChart.categoryField = "date";
    infoBoxChart.dataDateFormat = "YYYY-MM-DD";

    // sometimes we need to set margins manually
    // autoMargins should be set to false in order chart to use custom margin values
    infoBoxChart.autoMargins = false;
    infoBoxChart.marginRight = 0;
    infoBoxChart.marginLeft = 0;
    infoBoxChart.marginBottom = 0;
    infoBoxChart.marginTop = 0;

    var balloon = infoBoxChart.balloon;
    balloon.enabled = false;

    // AXIS
    // category
    var categoryAxis = infoBoxChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.tickLength = 0;
    categoryAxis.axisAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // value
    var infoBoxAxis = new AmCharts.ValueAxis();
    infoBoxAxis.dashLength = 4;
    infoBoxAxis.axisAlpha = 0;
    infoBoxAxis.gridAlpha = 0;
    infoBoxAxis.km = "km";
    infoBoxChart.addValueAxis(infoBoxAxis);

    // GRAPH
    var infoBoxGraph = new AmCharts.AmGraph();
    infoBoxGraph.title = "km";
    infoBoxGraph.valueField = "km"; 
    infoBoxGraph.type = "line";
    infoBoxGraph.valueAxis = infoBoxAxis; 
    infoBoxGraph.lineColor = "#11ca9e"; //light_green
    infoBoxGraph.lineThickness = 3;
    infoBoxGraph.color = "#ffffff";
    infoBoxGraph.labelText = "[[km]]";
    infoBoxGraph.bullet = "circle";
    infoBoxGraph.bulletBorderColor = "#ffffff";
    infoBoxGraph.bulletBorderThickness = 2;
    infoBoxGraph.bulletBorderAlpha = 1;
    infoBoxGraph.bulletSize = 10; 
    infoBoxChart.addGraph(infoBoxGraph);

    // WRITE
    infoBoxChart.write("info-box-chartdiv");
});

//leitura de bilhetes
 var infoBoxChartData2 = [{
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "bilhetes": 497
    },
    {
        "date": "2017-02-03",
        "bilhetes": 498
    },
    {
         "date": "2017-02-04",
        "bilhetes": 497
    }
];
var infoBoxChart2;

AmCharts.ready(function () {
    infoBoxChart2 = new AmCharts.AmSerialChart();
    infoBoxChart2.dataProvider = infoBoxChartData2;

    infoBoxChart2.categoryField = "date";
    infoBoxChart2.dataDateFormat = "YYYY-MM-DD";

    // sometimes we need to set margins manually
    // autoMargins should be set to false in order chart to use custom margin values
    infoBoxChart2.autoMargins = false;
    infoBoxChart2.marginRight = 0;
    infoBoxChart2.marginLeft = 0;
    infoBoxChart2.marginBottom = 0;
    infoBoxChart2.marginTop = 0;

    var balloon = infoBoxChart2.balloon;
    balloon.enabled = false;

    // AXIS
    // category
    var categoryAxis = infoBoxChart2.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.tickLength = 0;
    categoryAxis.axisAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // value
    var infoBoxAxis2 = new AmCharts.ValueAxis();
    infoBoxAxis2.dashLength = 4;
    infoBoxAxis2.axisAlpha = 0;
    infoBoxAxis2.gridAlpha = 0;
    infoBoxAxis2.bilhetes = "bilhetes";
    infoBoxChart2.addValueAxis(infoBoxAxis2);

    // GRAPH
    var infoBoxGraph2 = new AmCharts.AmGraph();
    infoBoxGraph2.title = "bilhetes";
    infoBoxGraph2.valueField = "bilhetes"; 
    infoBoxGraph2.type = "line";
    infoBoxGraph2.valueAxis = infoBoxAxis2; 
    infoBoxGraph2.lineColor = "#cb3f7e"; //pink
    infoBoxGraph2.lineThickness = 3;
    infoBoxGraph2.color = "#ffffff";
    infoBoxGraph2.labelText = "[[bilhetes]]";
    infoBoxGraph2.bullet = "circle";
    infoBoxGraph2.bulletBorderColor = "#ffffff";
    infoBoxGraph2.bulletBorderThickness = 2;
    infoBoxGraph2.bulletBorderAlpha = 1;
    infoBoxGraph2.bulletSize = 10; 
    infoBoxChart2.addGraph(infoBoxGraph2);

    // WRITE
    infoBoxChart2.write("info-box-chartdiv2");
});

//tempo de viagem
 var infoBoxChartData3 = [{
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "tempo": 155
    },
    {
        "date": "2017-02-03",
        "tempo": 156
    },
    {
         "date": "2017-02-04",
        "tempo": 150
    }
];
var infoBoxChart3;

AmCharts.ready(function () {
    infoBoxChart3 = new AmCharts.AmSerialChart();
    infoBoxChart3.dataProvider = infoBoxChartData3;

    infoBoxChart3.categoryField = "date";
    infoBoxChart3.dataDateFormat = "YYYY-MM-DD";

    // sometimes we need to set margins manually
    // autoMargins should be set to false in order chart to use custom margin values
    infoBoxChart3.autoMargins = false;
    infoBoxChart3.marginRight = 0;
    infoBoxChart3.marginLeft = 0;
    infoBoxChart3.marginBottom = 0;
    infoBoxChart3.marginTop = 0;

    var balloon = infoBoxChart3.balloon;
    balloon.enabled = false;

    // AXIS
    // category
    var categoryAxis = infoBoxChart3.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.tickLength = 0;
    categoryAxis.axisAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // value
    var infoBoxAxis3 = new AmCharts.ValueAxis();
    infoBoxAxis3.dashLength = 4;
    infoBoxAxis3.gridAlpha = 0;
    infoBoxAxis3.axisAlpha = 0;
    infoBoxAxis3.tempo = "tempo";
    infoBoxChart3.addValueAxis(infoBoxAxis3);

    // GRAPH
    var infoBoxGraph3 = new AmCharts.AmGraph();
    infoBoxGraph3.title = "tempo";
    infoBoxGraph3.valueField = "tempo"; 
    infoBoxGraph3.type = "line";
    infoBoxGraph3.valueAxis = infoBoxAxis3; 
    infoBoxGraph3.lineColor = "#358fcd"; //blue
    infoBoxGraph3.lineThickness = 3;
    infoBoxGraph3.color = "#ffffff";
    infoBoxGraph3.labelText = "[[tempo]]";
    infoBoxGraph3.bullet = "circle";
    infoBoxGraph3.bulletBorderColor = "#ffffff";
    infoBoxGraph3.bulletBorderThickness = 2;
    infoBoxGraph3.bulletBorderAlpha = 1;
    infoBoxGraph3.bulletSize = 10; 
    infoBoxChart3.addGraph(infoBoxGraph3);

    // WRITE
    infoBoxChart3.write("info-box-chartdiv3");
});

//direção contínua
 var infoBoxChartData4 = [{
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "horas": 7
    },
    {
        "date": "2017-02-03",
        "horas": 9
    },
    {
         "date": "2017-02-04",
        "horas": 7
    }
];
var infoBoxChart4;

AmCharts.ready(function () {
    infoBoxChart4 = new AmCharts.AmSerialChart();
    infoBoxChart4.dataProvider = infoBoxChartData4;

    infoBoxChart4.categoryField = "date";
    infoBoxChart4.dataDateFormat = "YYYY-MM-DD";

    // sometimes we need to set margins manually
    // autoMargins should be set to false in order chart to use custom margin values
    infoBoxChart4.autoMargins = false;
    infoBoxChart4.marginRight = 0;
    infoBoxChart4.marginLeft = 0;
    infoBoxChart4.marginBottom = 0;
    infoBoxChart4.marginTop = 0;

    var balloon = infoBoxChart4.balloon;
    balloon.enabled = false;

    // AXIS
    // category
    var categoryAxis = infoBoxChart4.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.tickLength = 0;
    categoryAxis.axisAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // value
    var infoBoxAxis4 = new AmCharts.ValueAxis();
    infoBoxAxis4.dashLength = 4;
    infoBoxAxis4.axisAlpha = 0;
    infoBoxAxis4.gridAlpha = 0;
    infoBoxAxis4.horas = "horas";
    infoBoxChart4.addValueAxis(infoBoxAxis4);

    // GRAPH
    var infoBoxGraph4 = new AmCharts.AmGraph();
    infoBoxGraph4.title = "horas";
    infoBoxGraph4.valueField = "horas"; 
    infoBoxGraph4.type = "line";
    infoBoxGraph4.valueAxis = infoBoxAxis4; 
    infoBoxGraph4.lineColor = "#9157ab"; //purple
    infoBoxGraph4.lineThickness = 3;
    infoBoxGraph4.color = "#ffffff";
    infoBoxGraph4.labelText = "[[horas]]";
    infoBoxGraph4.bullet = "circle";
    infoBoxGraph4.bulletBorderColor = "#ffffff";
    infoBoxGraph4.bulletBorderThickness = 2;
    infoBoxGraph4.bulletBorderAlpha = 1;
    infoBoxGraph4.bulletSize = 10; 
    infoBoxChart4.addGraph(infoBoxGraph4);

    // WRITE
    infoBoxChart4.write("info-box-chartdiv4");
});

//jornada de trabalho
 var infoBoxChartData5 = [{
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "jornada": 90
    },
    {
        "date": "2017-02-03",
        "jornada": 115
    },
    {
         "date": "2017-02-04",
        "jornada": 105
    }
];
var infoBoxChart5;

AmCharts.ready(function () {
    infoBoxChart5 = new AmCharts.AmSerialChart();
    infoBoxChart5.dataProvider = infoBoxChartData5;

    infoBoxChart5.categoryField = "date";
    infoBoxChart5.dataDateFormat = "YYYY-MM-DD";

    // sometimes we need to set margins manually
    // autoMargins should be set to false in order chart to use custom margin values
    infoBoxChart5.autoMargins = false;
    infoBoxChart5.marginRight = 0;
    infoBoxChart5.marginLeft = 0;
    infoBoxChart5.marginBottom = 0;
    infoBoxChart5.marginTop = 0;

    var balloon = infoBoxChart5.balloon;
    balloon.enabled = false;

    // AXIS
    // category
    var categoryAxis = infoBoxChart5.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = true;
    categoryAxis.gridAlpha = 0;
    categoryAxis.tickLength = 0;
    categoryAxis.axisAlpha = 0;
    categoryAxis.axisColor = "#555555";
    categoryAxis.labelsEnabled = true;
    categoryAxis.color = "#ffffff";

    // value
    var infoBoxAxis5 = new AmCharts.ValueAxis();
    infoBoxAxis5.gridAlpha = 0;
    infoBoxAxis5.dashLength = 4;
    infoBoxAxis5.axisAlpha = 0;
    infoBoxAxis5.jornada = "jornada";
    infoBoxChart5.addValueAxis(infoBoxAxis5);

    // GRAPH
    var infoBoxGraph5 = new AmCharts.AmGraph();
    infoBoxGraph5.title = "jornada";
    infoBoxGraph5.valueField = "jornada"; 
    infoBoxGraph5.type = "line";
    infoBoxGraph5.valueAxis = infoBoxAxis5; 
    infoBoxGraph5.lineColor = "#ec6051"; //red
    infoBoxGraph5.lineThickness = 3;
    infoBoxGraph5.color = "#ffffff";
    infoBoxGraph5.labelText = "[[jornada]]";
    infoBoxGraph5.bullet = "circle";
    infoBoxGraph5.bulletBorderColor = "#ffffff";
    infoBoxGraph5.bulletBorderThickness = 2;
    infoBoxGraph5.bulletBorderAlpha = 1;
    infoBoxGraph5.bulletSize = 10; 
    infoBoxChart5.addGraph(infoBoxGraph5);

    // WRITE
    infoBoxChart5.write("info-box-chartdiv5");
});

//detector de paradas
 var infoBoxChartData6 = [{
        //atenção para formatar os dados para que apareçam na tela como "02 Fev"
        "date": "2017-02-02",
        "paradas": 90
    },
    {
        "date": "2017-02-03",
        "paradas": 115
    },
    {
         "date": "2017-02-04",
        "paradas": 105
    }
];
var infoBoxChart6;

AmCharts.ready(function () {
    infoBoxChart6 = new AmCharts.AmSerialChart();
    infoBoxChart6.dataProvider = infoBoxChartData6;

    infoBoxChart6.categoryField = "date";
    infoBoxChart6.dataDateFormat = "YYYY-MM-DD";

    // sometimes we need to set margins manually
    // autoMargins should be set to false in order chart to use custom margin values
    infoBoxChart6.autoMargins = false;
    infoBoxChart6.marginRight = 0;
    infoBoxChart6.marginLeft = 0;
    infoBoxChart6.marginBottom = 0;
    infoBoxChart6.marginTop = 0;

    var balloon = infoBoxChart6.balloon;
    balloon.enabled = false;

   
    // AXIS
    // category
    var categoryAxis = infoBoxChart6.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.gridColor = "#384042";

    // value
    var infoBoxAxis6 = new AmCharts.ValueAxis();
    infoBoxAxis6.axisAlpha = 0;
    infoBoxAxis6.gridAlpha = 0;
    infoBoxAxis6.labelsEnabled = false;
    infoBoxAxis6.paradas = "paradas";
    infoBoxChart6.addValueAxis(infoBoxAxis6);

    // GRAPH
    var infoBoxGraph6 = new AmCharts.AmGraph();
    infoBoxGraph6.title = "paradas";
    infoBoxGraph6.valueField = "paradas"; 
    infoBoxGraph6.type = "line";
    infoBoxGraph6.valueAxis = infoBoxAxis6; 
    infoBoxGraph6.lineColor = "#eaa540"; //orange
    infoBoxGraph6.lineThickness = 3;
    infoBoxGraph6.color = "#ffffff";
    infoBoxGraph6.labelColorField = "#ffffff";
    infoBoxGraph6.labelText = "[[paradas]]";
    infoBoxGraph6.bullet = "circle";
    infoBoxGraph6.bulletBorderColor = "#ffffff";
    infoBoxGraph6.bulletBorderThickness = 2;
    infoBoxGraph6.bulletBorderAlpha = 1;
    infoBoxGraph6.bulletSize = 10; 
    infoBoxChart6.addGraph(infoBoxGraph6);

    // WRITE
    infoBoxChart6.write("info-box-chartdiv6");
});
class QuantitativoRelatoriosService{

    gerarCSV(quantitativos){
        return quantitativos ? quantitativos.map(quantitativo => quantitativo.toJson()) : []; 
    }

    obterCabecalhos(){
        return [
                
                "Linha",
                "Velocidade/Tempo",
                "Jornada Motorista",
                "Detector Parada",
                "Inicio/Fim Viagem",
                "Inicio/Fim Viagem Fretado",
                "Bilhete Embarque",
                "Venda Passagem",
                "Cancelamento Passagem", 
                "Viagens Programadas",
                "Viagens Válidas",
                "%Executadas"
            ]; 
    }

    gerarPDF(quantitativos,periodo){

         
        
        var widths = this.obterCabecalhos().map(() => '*'); 

        var headers = this.obterCabecalhos().map(cabecalho => {
            return {text:cabecalho,fontSize:12,alignment:'center'}
        }); 

        var body = [];
  
        body.push(headers); 

        var linhas = !quantitativos ? [] : quantitativos.map(this._obterLinha); 
        body.push(...linhas); 

        const titulo = "Quantitativos de logs - Monitriip";

        var docDefinition = {
            header: {text: titulo, headlineLevel: 1,fontSize: 20,bold:true,alignment:'center',margin:10},
            info : {
				title : titulo,
				author : "M2M Solutions",
			},
            pageOrientation: 'landscape',
            pageSize: 'A3', 
            pageMargins: [4,60,4, 60 ],
            content: [
              {text: `Período: ${periodo}`, headlineLevel: 1,fontSize:15,alignment:'right',bold:true,margin:20},  
              {
                layout: 'lightHorizontalLines', 
                table: {
                  headerRows: 1,
                  widths: widths,
                  body: body 
                }
              }
            ]
          };

        pdfMake.createPdf(docDefinition).download(); 
    }

    _obterLinha(quantitativo){
        return [
            {text:quantitativo.linha,alignment:'center',bold:true},
            {text:quantitativo.qtdVelocidadeTempo,alignment:'center'},
            {text:quantitativo.qtdJornadas,alignment:'center'},
            {text:quantitativo.qtdDetectorParada,alignment:'center'},
            {text:quantitativo.qtdInicioFimViagem,alignment:'center'},
            {text:quantitativo.qtdInicioFimViagemFretado,alignment:'center'},
            {text:quantitativo.qtdBilheteEmbarque,alignment:'center'},
            {text:quantitativo.qtdVendaPassagem,alignment:'center'},
            {text:quantitativo.qtdCancelamentoPassagem,alignment:'center'},
            {text:quantitativo.qtdViagensProgramadas,alignment:'center'},
            {text:quantitativo.qtdViagensValidas,alignment:'center'},
            {text:quantitativo.percentualDeViagensPlanejadasExecutadas,alignment:'center'}
        ]; 
    }
}

angular.module('monitriip-web')
        .service('QuantitativoRelatoriosService',QuantitativoRelatoriosService);
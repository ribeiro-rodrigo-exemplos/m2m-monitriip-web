class QuantitativoLinhaController {
    constructor(document,dateUtil,quantitativosService,alertService,relatoriosService){

        this._document = document[0]; 
        this._dateUtil = dateUtil; 
        this._quantitativosService = quantitativosService; 
        this._alertService = alertService; 
        this._relatoriosService = relatoriosService; 

        this._inicializar(); 
    }

    esconderFiltroDeMeses(){
        return this.visaoSelecionada != this._visaoMensal; 
    }

    esconderFiltroDeDia(){
        return this.visaoSelecionada != this._visaoDiaria; 
    }

    consultar(){
        
        this.loading = true 

        if(this.visaoSelecionada == this._visaoMensal){
            this._obterQuantitativosDoMes(); 
        }
        else{
            this._obterQuantitativosDoDia(); 
        }
    }
 
    limpar(){
        this._setarDataAtual(); 
        this._setarMesAtual();  
    }

    gerarPDF(){
        
        var periodo = ''; 

        if(this.visaoSelecionada == this._visaoDiaria)
            periodo = this._dateUtil.formatarParaPtBr(this._obterDataSelecionada()); 
        else
            periodo = this._dateUtil.formatarMesParaPtBr(this._obterMesSelecionado()); 

        this._relatoriosService.gerarPDF(this.quantitativos,periodo); 
    }
    
    get quantitativos(){
        return this._quantitativos; 
    }

    get csv(){
        return this._relatoriosService.gerarCSV(this.quantitativos); 
    }

    get csvHeaders(){
        return this._relatoriosService.obterCabecalhos(); 
    }

    _obterQuantitativosDoDia(){
        this._quantitativosService
            .obterQuantitativosDoDia(this._obterDataSelecionada())
                .then(quantitativos => this._tratarQuantitativosRetornados(quantitativos))
                .catch(erro => this._tratarErroRetornado(erro,"Erro ao consultar os quantitativos da data."));
    }

    _obterQuantitativosDoMes(){
        this._quantitativosService
            .obterQuantitativosDoMes(this._obterMesSelecionado())
                .then(quantitativos => this._tratarQuantitativosRetornados(quantitativos))
                .catch(erro => this._tratarErroRetornado(erro,"Erro ao consultar os quantitativos do mês.")); 
    }

    _tratarQuantitativosRetornados(quantitativos){
        this._quantitativos = quantitativos.map(quantitativo => this._prepararExibicao(quantitativo))
                                            .filter(quantitativo => quantitativo.resultado)
                                            .map(quantitativo => new Quantitativo(quantitativo)); 

        if(!this._quantitativos.length){
            this._alertService.exibirAlert("Nenhum resultado encontrado.",this); 
        }
        this.loading = false; 
    }

    _tratarErroRetornado(erro,mensagem){
        this._alertService.exibirAlert(mensagem,this);
        this.loading = false; 
    }

    _prepararExibicao(quantitativo){
        if(this.visaoSelecionada == this._visaoMensal){  
            quantitativo.resultado = quantitativo.doMes; 
        }else{
   
            var quantitativosDaData = quantitativo.porDia ? quantitativo.porDia[this._obterDataSelecionada()] : undefined;          
            console.log(quantitativosDaData)
            quantitativo.resultado =  quantitativosDaData ? quantitativosDaData : null ; 
        }

        delete quantitativo.doMes;
        delete quantitativo.porDia; 

        return quantitativo 
    }

    _inicializar(){
        this._visaoDiaria = "Diária"; 
        this._visaoMensal = "Mensal"; 
        this.visoes = [
            this._visaoMensal,
            this._visaoDiaria
        ]; 

        this.visaoSelecionada = this.visoes[1]; 

        this._setarMesAtual(); 
    }

    _setarDataAtual(){
        var dataElement =  this._document.getElementById("data");
        dataElement.objetoSelecionado = this._obterDataAtual(); 
    }

    _setarMesAtual(){
        let mesElement = this._document.getElementById("mes")
        mesElement.value = this._obterMesAtual();  
    }

    _obterDataAtual(){
        let data = new Date(); 
        return this._dateUtil.formatarParaPtBr(data); 
    }

    _obterDataSelecionada(){
        let dataElement =  this._document.getElementById("data");
        let data = dataElement.objetoSelecionado; 
        data = this._dateUtil.formatarIsoDatePattern(data); 
        return this._dateUtil.formatarParaIsoDate(data); 
    }

    _obterMesSelecionado(){
        let mesElement = this._document.getElementById("mes")
        return mesElement.value 
    }

    _obterMesAtual(){
        return this._dateUtil.obterMesEAnoAtual();  
    }
}

QuantitativoLinhaController.$inject = [
    "$document", 
    "DateUtil",
    "QuantitativosService", 
    "AlertService", 
    "QuantitativoRelatoriosService" 
]; 

angular.module('monitriip-web')
        .controller('QuantitativoLinhaController',QuantitativoLinhaController);
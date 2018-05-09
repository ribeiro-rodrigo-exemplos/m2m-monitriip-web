class QuantitativoLinhaController {
    constructor(document,dateUtil,quantitativosService,alertService,relatoriosService,numberUtil){

        this._document = document[0]; 
        this._dateUtil = dateUtil; 
        this._quantitativosService = quantitativosService; 
        this._alertService = alertService; 
        this._relatoriosService = relatoriosService; 
        this._numberUtil = numberUtil; 

        this._inicializar(); 
    }

    esconderFiltroDeMeses(){
        return this.visaoSelecionada != this._visaoMensal; 
    }

    esconderFiltroDeDia(){
        return this.visaoSelecionada != this._visaoDiaria; 
    }

    consultar(){
        
        this.loading = true;  

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
        this._setarAnoAtual(); 
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
        
        this._carregarMeses();
        this._carregarAnos(); 

        this._setarMesAtual(); 
        this._setarAnoAtual(); 
    }

    _carregarMeses(){
        this.meses = [
            {numero:"01",nome:"Janeiro"},
            {numero:"02",nome:"Fevereiro"},
            {numero:"03",nome:"Março"},
            {numero:"04",nome:"Abril"},
            {numero:"05",nome:"Maio"},
            {numero:"06",nome:"Junho"},
            {numero:"07",nome:"Julho"},
            {numero:"08",nome:"Agosto"}, 
            {numero:"09",nome:"Setembro"},
            {numero:"10",nome:"Outubro"},
            {numero:"11",nome:"Novembro"},
            {numero:"12",nome:"Dezembro"}
        ];
    }

    _carregarAnos(){
        var anoAtual = this._dateUtil.obterAnoAtual(); 
        this.anos = []; 
        for(var ano =2018; ano<=anoAtual; ano++){
            this.anos.push(ano); 
        }
    }

    _setarDataAtual(){
        var dataElement =  this._document.getElementById("data");
        dataElement.objetoSelecionado = this._obterDataAtual(); 
    }

    _setarMesAtual(){
        this.mesSelecionado = this.meses[new Date().getMonth()]; 
    }

    _setarAnoAtual(){
        this.anoSelecionado = this.anos[this.anos.length-1];
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
        return `${this.anoSelecionado}-${this.mesSelecionado.numero}`; 
    }
}

QuantitativoLinhaController.$inject = [
    "$document", 
    "DateUtil",
    "QuantitativosService", 
    "AlertService", 
    "QuantitativoRelatoriosService",
    "NumberUtil" 
]; 

angular.module('monitriip-web')
        .controller('QuantitativoLinhaController',QuantitativoLinhaController);
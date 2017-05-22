/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,painelService,FullScreen,graficoGeral,kmPercorridoTotalizador,leituraBilhetesTotalizador, 
                tempoViagemTotalizador, jornadaTrabalhoTotalizador,direcaoContinuaTotalizador, paradasTotalizador, 
                extratoPorDia, infoViagemPopup,dateUtil){
        
        this.graficoGeral = graficoGeral;
        this.kmPercorridoTotalizador = kmPercorridoTotalizador;
        this.leituraBilhetesTotalizador = leituraBilhetesTotalizador;
        this.tempoViagemTotalizador = tempoViagemTotalizador;
        this.jornadaTrabalhoTotalizador = jornadaTrabalhoTotalizador;
        this.direcaoContinuaTotalizador = direcaoContinuaTotalizador;
        this.paradasTotalizador = paradasTotalizador;
        this.extratoPorDia = extratoPorDia;
        this.infoViagemPopup = infoViagemPopup;
        
        this._viagemService = viagemService;
        this._painelService = painelService;

        this._FullScreen = FullScreen;
        this._dateUtil = dateUtil; 

        this._listeners = [];

        this._init();
    }

    consultarPeriodo() {

        if(this._consultaInvalida())
            return; 
        
        let dataInicial = this._dateUtil.formatarParaIsoDate(this.filtro.dataInicial);
        let dataFinal = this._dateUtil.formatarParaIsoDate(this.filtro.dataFinal);

        this._painelService.consultarPeriodo(dataInicial,dataFinal,this.filtro.cnpjCliente,this.filtro.cpfMotorista,this.filtro.placaVeiculo)
            .then(retorno => this._notify(retorno))
            .catch(error => console.error(error)); 
    }

    consultarViagemPorId(id){
        this._viagemService.obterViagemPorId(id)
            .then(detalheViagem => {

                if(detalheViagem)
                    this.infoViagemPopup.exibirDetalhesDaViagem(detalheViagem);
                else
                    alert('Não foi possível consultar a viagem selecionada');
            });
    }

    limparFiltros(){
        this.filtro = {};
    }

    habilitarTelaCheia(){
        this._FullScreen.enable(document.documentElement);
    }

    _init(){

        this._addListener(
            this.leituraBilhetesTotalizador,
            this.kmPercorridoTotalizador,
            this.tempoViagemTotalizador,
            //this.jornadaTrabalhoTotalizador,
            this.direcaoContinuaTotalizador,
            this.paradasTotalizador,
            this.graficoGeral,
            this.extratoPorDia
        );
    }

    _addListener(){
        this._listeners.push(...arguments);
    }

    _notify(event){
        this._listeners.forEach(listener => listener.atualizar(this._clone(event)));
    }

    _clone(event){
        return JSON.parse(JSON.stringify(event)); 
    }

    _consultaInvalida(){

        if(!this.filtro || !this.filtro.dataInicial || !this.filtro.dataFinal){
            alert('Informe das datas inicias e finais');
            return true; 
        }

        if(!this._dateUtil.periodoValido(this.filtro.dataInicial,this.filtro.dataFinal)){
            alert('A data inicial deve ser menor que a data final');
            return true; 
        }

        if(!this._dateUtil.dentroDoPeriodoDeDias(this.filtro.dataInicial,this.filtro.dataFinal,3)){
            alert('O período máximo de consulta é de até 3 dias.');
            return true;
        }

        return false;
    }
}

PainelViagemController.$inject = [
                                    'ViagemService',
                                    'PainelService',
                                    'Fullscreen',
                                    'GraficoGeral',
                                    'KmPercorridoTotalizador',
                                    'LeituraBilhetesTotalizador',
                                    'TempoViagemTotalizador',
                                    'JornadaTrabalhoTotalizador',
                                    'DirecaoContinuaTotalizador',
                                    'ParadasTotalizador',
                                    'ExtratoPorDia',
                                    'InfoViagemPopup',
                                    'DateUtil'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
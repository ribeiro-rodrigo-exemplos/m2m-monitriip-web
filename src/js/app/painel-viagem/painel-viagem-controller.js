/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,painelService,FullScreen,graficoGeral,kmPercorridoTotalizador,leituraBilhetesTotalizador, 
                tempoViagemTotalizador, jornadaTrabalhoTotalizador,direcaoContinuaTotalizador, paradasTotalizador, 
                painelViagens, infoViagemPopup){
        
        this.graficoGeral = graficoGeral;
        this.kmPercorridoTotalizador = kmPercorridoTotalizador;
        this.leituraBilhetesTotalizador = leituraBilhetesTotalizador;
        this.tempoViagemTotalizador = tempoViagemTotalizador;
        this.jornadaTrabalhoTotalizador = jornadaTrabalhoTotalizador;
        this.direcaoContinuaTotalizador = direcaoContinuaTotalizador;
        this.paradasTotalizador = paradasTotalizador;
        this.painelViagens = painelViagens;
        this.infoViagemPopup = infoViagemPopup;
        
        this._viagemService = viagemService;
        this._painelService = painelService;

        this._FullScreen = FullScreen;

        this._listeners = [];

        this._init();


    }

    consultarPeriodo() {
        this._painelService.obterTotalizadoresDoPeriodo()
            .then(retorno => this._notify(retorno));
    }

    consultarViagemPorId(id){
        this._viagemService.obterViagemPorId(id)
            .then(detalheViagem => {
                this.infoViagemPopup.obterDetalheViagem(detalheViagem);
            }); 
    }

    limparFiltros(){
        this.filtro = {};
    }

    habilitarTelaCheia(){
        this._FullScreen.enable(document.documentElement);
    }

    _init(){
        this._addListener(this.leituraBilhetesTotalizador);
        this._addListener(this.kmPercorridoTotalizador);
        this._addListener(this.tempoViagemTotalizador);
        this._addListener(this.jornadaTrabalhoTotalizador);
        this._addListener(this.direcaoContinuaTotalizador);
        this._addListener(this.paradasTotalizador);
        this._addListener(this.graficoGeral);
        this._addListener(this.painelViagens);
    }

    _addListener(listener){
        this._listeners.push(listener);
    }

    _notify(event){
        this._listeners.forEach(listener => listener.atualizar(this._clone(event)));
    }

    _clone(event){
        return JSON.parse(JSON.stringify(event))
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
                                    'PainelViagens',
                                    'InfoViagemPopup'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
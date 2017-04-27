/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,painelService,FullScreen,graficoGeral,kmPercorridoTotalizador,leituraBilhetesTotalizador, tempoViagemTotalizador, jornadaTrabalhoTotalizador,
                direcaoContinuaTotalizador, GraficoGeral){

        this.graficoGeral = graficoGeral;
        this.kmPercorridoTotalizador = kmPercorridoTotalizador;
        this.leituraBilhetesTotalizador = leituraBilhetesTotalizador;
        this.tempoViagemTotalizador = tempoViagemTotalizador;
        this.jornadaTrabalhoTotalizador = jornadaTrabalhoTotalizador;
        this.direcaoContinuaTotalizador = direcaoContinuaTotalizador;
        this.GraficoGeral = GraficoGeral;

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

    limparFiltros(){
        this.filtro = {};
    }

    habilitarTelaCheia(){
        this._FullScreen.enable(document.documentElement);
    }

    _init(){
        this._addListener(this.kmPercorridoTotalizador);
        this._addListener(this.leituraBilhetesTotalizador);
        this._addListener(this.tempoViagemTotalizador);
        this._addListener(this.jornadaTrabalhoTotalizador);
        this._addListener(this.direcaoContinuaTotalizador);
        this._addListener(this.GraficoGeral);
    }

    _addListener(listener){
        this._listeners.push(listener);
    }

    _notify(event){
        this._listeners.forEach(listener => listener.atualizar(event));
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
                                    'GraficoGeral'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
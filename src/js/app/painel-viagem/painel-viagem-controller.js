/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,painelService,FullScreen,graficoGeral,kmPercorridoTotalizador){

        this.graficoGeral = graficoGeral;
        this.kmPercorridoTotalizador = kmPercorridoTotalizador;

        this._viagemService = viagemService;
        this._painelService = painelService;

        this._FullScreen = FullScreen;

        this._listeners = [];

        this._init();
    }

    consultarPeriodo() {
        this._painelService.obterTotalizadoresDoPeriodo()
            .then(retorno => this._notify(retorno.totalizadores));
    }

    limparFiltros(){
        this.filtro = {};
    }

    habilitarTelaCheia(){
        this._FullScreen.enable(document.documentElement);
    }

    _init(){
        this._addListener(this.kmPercorridoTotalizador);
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
                                    'KmPercorridoTotalizador'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,painelService,FullScreen,graficoGeral,kmPercorridoTotalizador,leituraBilhetesTotalizador, 
                tempoViagemTotalizador, jornadaTrabalhoTotalizador,direcaoContinuaTotalizador, paradasTotalizador, 
                extratoPorDia, infoViagemPopup){
        
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

        this._listeners = [];

        this._init();
    }

    consultarPeriodo() {
        this._painelService.obterTotalizadoresDoPeriodo()
            .then(retorno => this._notify(retorno));
        /*this._viagemService
            .obterExtratosDeViagensPorPeriodo('2017-04-01','2017-04-08','123456')
            .then(result => console.log(result))
            .catch(error => console.error(error));*/
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

        this._addListener(
            this.leituraBilhetesTotalizador,
            this.kmPercorridoTotalizador,
            this.tempoViagemTotalizador,
            this.jornadaTrabalhoTotalizador,
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
                                    'InfoViagemPopup'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
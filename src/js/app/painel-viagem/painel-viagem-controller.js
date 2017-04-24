/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,graficoGeral,kmPercorridoTotalizador,FullScreen){

        this.graficoGeral = graficoGeral;
        this.kmPercorridoTotalizador = kmPercorridoTotalizador;

        this._viagemService = viagemService;
        this._FullScreen = FullScreen;
    }

    limparFiltros(){
        this.filtro = {};
        this.kmPercorridoTotalizador.kmPercorrido = [35, 10, 25];
    }

    consultarViagens(){
        this._viagemService.obterViagens();
    }

    habilitarTelaCheia(){
        this._FullScreen.enable(document.documentElement);
    }

    postConstruct(){

        this.filtro = {
            placa:'85500',
            cpf:'689465465875',
            cnpj:'aaa'
        };
    }
}

PainelViagemController.$inject = [
                                    'ViagemService',
                                    'GraficoGeral',
                                    'KmPercorridoTotalizador',
                                    'Fullscreen'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
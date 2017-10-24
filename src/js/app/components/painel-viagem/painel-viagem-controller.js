/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class PainelViagemController{

    constructor(viagemService,painelService,checkinService,FullScreen,graficoGeral,kmPercorridoTotalizador,leituraBilhetesTotalizador, 
                tempoViagemTotalizador, jornadaTrabalhoTotalizador,direcaoContinuaTotalizador, paradasTotalizador, 
                extratoPorDia, infoViagemPopup,dateUtil,eventBus){
        
        this._bilhetesCheckin = [];
        this._seletor = document.getElementById.bind(document);
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
        this._checkinService = checkinService;
        this._eventBus = eventBus;

        this._FullScreen = FullScreen;
        this._dateUtil = dateUtil;
        this.filtro = {dataInicial:null,dataFinal:null};
    }

    get filtroDeConsulta(){
        let inicio = this.filtro.dataInicial ? this._dateUtil.obterDiaEMes(this.filtro.dataInicial) : '';
        let fim = this.filtro.dataFinal ? this._dateUtil.obterDiaEMes(this.filtro.dataFinal) : '';
        return `${inicio} - ${fim}`;
    }

    consultarPeriodo() {

        this.filtro.dataInicial = this._dateUtil.formatarIsoDatePattern(this._seletor('dataInicial').objetoSelecionado);
        this.filtro.dataFinal = this._dateUtil.formatarIsoDatePattern(this._seletor('dataFinal').objetoSelecionado);

        if(this._consultaInvalida())
            return; 
        
        let dataInicial = this._dateUtil.formatarParaIsoDate(this.filtro.dataInicial);
        let dataFinal = this._dateUtil.formatarParaIsoDate(this.filtro.dataFinal);

        this.loading = true;

        this._painelService.consultarPeriodo(dataInicial,dataFinal,this.filtro.cnpjCliente,this.filtro.cpfMotorista,this.filtro.placaVeiculo)
            .then(retorno => {
                this.loading = false;

                if(!retorno){
                    this._exibirAlert('Nenhum dado encontrato.');
                    this.exibirTela = false;
                    return; 
                }

                this._notifyComponents(retorno);
                this.exibirTela = true;
            })
            .catch(error => {
                console.error(error);
                this.loading = false; 
            }); 
    }

    consultarViagemPorId(id){

        var promises = [
            this._checkinService.obterBilheteCheckin(id),
            this._viagemService.obterViagemPorId(id)
        ];

        Promise.all(promises)
            .then(result => {

                this._bilhetesCheckin = result[0];
                let detalheViagem = result[1];
                
                this._bilhetesCheckin = this._bilhetesCheckin.map(bilCheckin => bilCheckin.bilhete.numeroBilheteEmbarque);

                if(detalheViagem)
                    this.infoViagemPopup.exibirDetalhesDaViagem(detalheViagem);
                else
                    this._exibirAlert('Não foi possível consultar a viagem selecionada');

            });

    }

    verificaCheckinBilhete(bilhete){
        let retorno = false;
        this._bilhetesCheckin.filter(bil => bil == bilhete ? retorno = true : null);

        return retorno;
    }

    limparFiltros(){
        this.filtro = {};
        this._limpaDataFiltro('dataInicial');
        this._limpaDataFiltro('dataFinal');
    }

    habilitarTelaCheia(){
        this._FullScreen.enable(document.documentElement);
    }

    _limpaDataFiltro(campo){
        this._seletor(campo).dataPadrao = new Date();
        this._seletor(campo).objetoSelecionado = moment().format("DD/MM/YYYY");
    }

    _notifyComponents(event){
        this._eventBus.emit('event:painel:update',event);
        this._eventBus.emit('event:painel:components:updated',event);
    }

    _exibirAlert(mensagem){
        let alert = document.getElementById('alert');
        this.alert = {mensagem:mensagem};
        alert.classList.remove('alerts-container--active');
        setTimeout(() => alert.classList.add('alerts-container--active'),10);
    }

    _consultaInvalida(){

        if(!this.filtro || !this.filtro.dataInicial || !this.filtro.dataFinal){
            this._exibirAlert('Informe das datas inicias e finais');
            return true; 
        }

        if(!this._dateUtil.periodoValido(this.filtro.dataInicial,this.filtro.dataFinal)){
            this._exibirAlert('A data inicial deve ser menor que a data final');
            return true; 
        }

        if(!this._dateUtil.dentroDoPeriodoDeDias(this.filtro.dataInicial,this.filtro.dataFinal,3)){
            this._exibirAlert('O período máximo de consulta é de até 3 dias.');
            return true;
        }

        return false;
    }
}

PainelViagemController.$inject = [
                                    'ViagemService',
                                    'PainelService',
                                    'CheckinService',
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
                                    'DateUtil',
                                    'EventBusService'
                                 ];

angular.module('monitriip-web')
        .controller('PainelViagemController',PainelViagemController);
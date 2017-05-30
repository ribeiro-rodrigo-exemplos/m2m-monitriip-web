class InfoViagemPopup{
    constructor(document,promise,dateUtil,geoCoderHelper,numberUtil,jornadaService){
        this._dateUtil = dateUtil;
        this._geocoderHelper = geoCoderHelper;
        this._document = document[0];
        this._promise = promise;
        this._detalheDaViagem = {};
        this._numberUtil = numberUtil;
        this._jornadaService = jornadaService;
        this._jornadas = [];
    }

    exibirDetalhesDaViagem(periodosDaViagem){
        this._abrirPopup();

        this._viagem = new Viagem(periodosDaViagem);

        this._obterJornadas(periodosDaViagem)
            .then(jornadas => {
                console.log(jornadas);
            });

        //this._geocoderHelper.obterEndereco(-43.285343,-22.834171);
        
    }

    abrirDetalhesDoBilhete(campo){
        this._document
                .querySelector(`.bilhete-${campo} + .toggle_table`)
                .classList
                .toggle('none');
    }

    formatarNumero(numero){
        return this._numberUtil.formatarNumero(numero);
    }

    formatarDataHora(dataHora){
        return dataHora ? this._dateUtil.formatarDataHora(dataHora) : '';
    }

    formatarHorario(horario){
        return horario ? this._dateUtil.obterHorario(horario) : ''; 
    }

    obterDuracaoDaViagem(){
        return this._viagem && this._viagem.dataHoraInicial && this._viagem.dataHoraFinal ? 
        this._dateUtil.obterDuracao(this._viagem.dataHoraInicial,this._viagem.dataHoraFinal) : '';
    }

    get viagem(){
        return this._viagem;
    }

    _obterJornadas(periodosDaViagem){
        let motoristas = [...new Set(periodosDaViagem.map(servico => servico.cpfMotorista)).values()]; 

        let consultasJornadas = motoristas.map(cpfMotorista => this._jornadaService.obterJornadas({
            cpfMotorista:cpfMotorista,
            dataInicial:this._dateUtil.formatarParaIsoDate(this._viagem.dataHoraInicial),
            dataFinal:this._viagem.dataHoraFinal ? 
                this._dateUtil.formatarParaIsoDate(this._viagem.dataHoraFinal) : this._dateUtil.formatarParaIsoDate(new Date())
        }));

        return this._promise
                    .all(consultasJornadas);
    }

    _abrirPopup(){
        this._document
            .querySelector('.popup')
                .classList
                    .remove('none');
    }

    _formataCoordenadas(x, y){
        return x + " / " + y;
    }
}

InfoViagemPopup.$inject = [
    '$document',
    '$q',
    'DateUtil',
    'GeocoderHelper',
    'NumberUtil',
    'JornadaService'
];

angular.module('monitriip-web')
        .service('InfoViagemPopup', InfoViagemPopup);
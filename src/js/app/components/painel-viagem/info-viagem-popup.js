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

        this._locationStrategy = this._geocoderHelper.obterEndereco.bind(this._geocoderHelper);
    }

    exibirDetalhesDaViagem(periodosDaViagem){
        this._abrirPopup();

        this._viagem = new Viagem(periodosDaViagem, this._geocoderHelper);

        this._obterJornadas(periodosDaViagem)
            .then(jornadas => this._jornadas = jornadas)
            .then(() => this._obterEnderecosDasJornadas());   
    }

    abrirDetalhesDoBilhete(campo,bilhete){
        this._document
                .querySelector(`.bilhete-${campo} + .toggle_table`)
                .classList
                .toggle('none');

        bilhete.carregarLocalizacao(this._locationStrategy);
    }
    
    formatarNumero(numero){
        return this._numberUtil.formatarNumero(numero);
    }

    formatarNumeroComDuasCasasDecimais(numero){
        return this._numberUtil.formatarNumeroComDuasCasasDecimais(numero);
    }

    formatarDataHora(dataHora){
        return dataHora ? this._dateUtil.formatarDataHora(dataHora) : '';
    }

    formatarHorario(horario){
        return horario ? this._dateUtil.obterHorario(horario) : ''; 
    }

    formatarDuracaoDaJornada(jornada){
        return jornada.dataHoraInicial && jornada.dataHoraFinal ? this._dateUtil.obterDuracao(jornada.dataHoraInicial,jornada.dataHoraFinal) : '';
    }

    obterDuracaoDaViagem(){
        return this._viagem && this._viagem.dataHoraInicial && this._viagem.dataHoraFinal ? 
        this._dateUtil.obterDuracao(this._viagem.dataHoraInicial,this._viagem.dataHoraFinal) : '';
    }

    obterDuracaoTotalDasJornadas(){
        return this._numberUtil
                    .formatarNumero(this._jornadas.reduce((total,jornada) => 
                                        this._dateUtil.obterDuracaoEmHoras(jornada.dataHoraInicial,
                                        jornada.dataHoraFinal ? jornada.dataHoraFinal : new Date()) + total,0 
                                   )
        );
    }
    
    get viagem(){
        return this._viagem;
    }

    get jornadas(){
        return this._jornadas;
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
                    .all(consultasJornadas)
                    .then(consultas => !consultas.length ? [] : consultas.reduce((acc,jornadas) => {
                        jornadas.forEach(properties => acc.push(new Jornada(properties)));
                        return acc; 
                    },[]));
    }

    _obterEnderecosDasJornadas(){
        this._jornadas
            .forEach(jornada => jornada.carregarLocalizacoes(this._locationStrategy));
    }

    _abrirPopup(){
        this._document
            .querySelector('.popup')
                .classList
                    .remove('hidden');
            this._document
                .querySelector('.popup__content')
                .classList
                    .add('flip-horizontal--active');
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
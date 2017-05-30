class InfoViagemPopup{
    constructor(document,promise,dateUtil,geoCoderHelper,numberUtil,jornadaService){
        this._dateUtil = dateUtil;
        this._geocoderHelper = geoCoderHelper;
        this._document = document[0];
        this._promise = promise;
        this._detalheDaViagem = {};
        this._numberUtil = numberUtil;
        this._jornadaService = jornadaService;
    }

    exibirDetalhesDaViagem(servicosDaViagem){
        this._abrirPopup();
        
        if(servicosDaViagem.length === 0)
            return; 

        this._montarInformacoesBasicasDaViagem(servicosDaViagem);
        this._montarAbaInfoViagem(servicosDaViagem);
        this._montarAbaJornadas(servicosDaViagem);

        this._geocoderHelper.obterEndereco(-43.285343,-22.834171);
        
    }

    abrirDetalhesDoBilhete(campo){
        this._document
                .querySelector(`.bilhete-${campo} + .toggle_table`)
                .classList
                .toggle('none');
    }

    get detalheViagem(){
        return this._detalheDaViagem;
    }

    _montarInformacoesBasicasDaViagem(servicosDaViagem){

        this._detalheDaViagem = servicosDaViagem[0];

        let dataHoraInicial = this._obterDataHoraInicial(servicosDaViagem);
        dataHoraInicial = dataHoraInicial ? this._dateUtil.formatarDataHora(dataHoraInicial) : '';

        let dataHoraFinal = this._obterDataHoraFinal(servicosDaViagem);
        dataHoraFinal = dataHoraFinal ? this._dateUtil.formatarDataHora(dataHoraFinal) : '';

        this._detalheDaViagem.dataHoraInicial = this._obterDataHoraInicial(servicosDaViagem);
        this._detalheDaViagem.dataHoraFinal = this._obterDataHoraFinal(servicosDaViagem);

        this._detalheDaViagem.duracaoTotalDaViagem = this._obterDuracaoDaViagem(this._detalheDaViagem.dataHoraInicial,this._detalheDaViagem.dataHoraFinal);
        let duracaoEmMinutos = servicosDaViagem.reduce((total,servico) => total+servico.duracao ? servico.duracao : 0,0);
        this._detalheDaViagem.duracaoEmMinutos = duracaoEmMinutos ? this._detalheDaViagem.duracaoEmMinutos : '';
    }

    _montarAbaJornadas(servicosDaViagem){
        let motoristas = [...new Set(servicosDaViagem.map(servico => servico.cpfMotorista)).values()]; 

        let consultasJornadas = motoristas.map(cpfMotorista => this._jornadaService.obterJornadas({
            cpfMotorista:cpfMotorista,
            dataInicial:this._dateUtil.formatarParaIsoDate(this._obterDataHoraInicial(servicosDaViagem)),
            dataFinal:this._obterDataHoraFinal(servicosDaViagem) ? 
                this._dateUtil.formatarParaIsoDate(this._obterDataHoraFinal(servicosDaViagem)) : this._dateUtil.formatarParaIsoDate(new Date())
        }));

        this._promise
            .all(consultasJornadas)
            .then(responses => {
                console.log(responses);
            }); 
    }

    _montarAbaInfoViagem(servicosDaViagem){
        
        this._detalheDaViagem.servicos = servicosDaViagem.map(servico => {
            return {
                placaVeiculo:servico.placaVeiculo,
                cpfMotorista:servico.cpfMotorista,
                horaInicio:this._dateUtil.obterHorario(servico.dataHoraInicial),
                horaFim:this._dateUtil.obterHorario(servico.dataHoraFinal)
            };
        });

        this._detalheDaViagem.quantidadeDeMotoristas = [...new Set(this._detalheDaViagem.servicos.map(t => t.cpfMotorista)).values()].length;
        this._detalheDaViagem.quantidadeDeVeiculos = [...new Set(this._detalheDaViagem.servicos.map(t => t.placaVeiculo)).values()].length;

        let totalKm = servicosDaViagem.reduce((total,servico) => total+servico.totalKm,0);
        this._detalheDaViagem.totalKm = totalKm ? this._numberUtil.formatarNumero(totalKm) : '';

        let direcaoContinuaMaxima = servicosDaViagem.reduce((maior,servico) => 
            servico.direcaoContinua.tempoMaximo > maior ? servico.direcaoContinua.tempoMaximo :maior,0); 

        this._detalheDaViagem.direcaoContinuaMaxima = direcaoContinuaMaxima ? direcaoContinuaMaxima : '';

        this._detalheDaViagem.calculoVelocidades = this._calcularVelocidades(servicosDaViagem);
    }

    _calcularVelocidades(servicos){
   
        let calculoVelocidade = {};

        let velocidades = servicos.map(servico => servico.localizacoes)
                                  .reduce((acc,localizacoes) => {
                                      localizacoes.forEach(l => {
                                          if(typeof(l.velocidade) == 'number')
                                            acc.push(l.velocidade);
                                      });
                                      return acc; 
                                  },[]);

        if(velocidades.length){
            calculoVelocidade.velocidadeMaxima = Math.max.apply(null,velocidades);
            calculoVelocidade.velocidadeMinima = Math.min.apply(null,velocidades); 
            calculoVelocidade.velocidadeMedia = velocidades.reduce((acumulador,velocidade) => acumulador+velocidade,0)/velocidades.length;
        } 

        return calculoVelocidade; 
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

    _obterDuracaoDaViagem(dataHoraInicial,dataHoraFinal){
        return dataHoraInicial && dataHoraFinal ? this._dateUtil.obterDuracao(dataHoraInicial,dataHoraFinal) : '';
    }

    _obterDataHoraInicial(servicosDaViagem){
        return servicosDaViagem[0].dataHoraInicial;
    }

    _obterDataHoraFinal(servicosDaViagem){
        return servicosDaViagem[servicosDaViagem.length-1].dataHoraFinal;
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
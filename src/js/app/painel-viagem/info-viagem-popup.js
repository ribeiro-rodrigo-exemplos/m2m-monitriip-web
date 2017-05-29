class InfoViagemPopup{
    constructor(document,dateUtil,geoCoderHelper,numberUtil){
        this._dateUtil = dateUtil;
        this._geocoderHelper = geoCoderHelper;
        this._document = document[0];
        this._detalheDaViagem = {};
        this._numberUtil = numberUtil;
    }

    exibirDetalhesDaViagem(detalheViagem){
        this._abrirPopup();
        
        if(detalheViagem.length === 0)
            return; 

        this._montarInfoViagem(detalheViagem);

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

    _montarInfoViagem(servicosDaViagem){
        this._detalheDaViagem = servicosDaViagem[0];

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

        let dataHoraInicial = this._detalheDaViagem.dataHoraInicial;
        let dataHoraFinal = servicosDaViagem[servicosDaViagem.length-1].dataHoraFinal;

        this._detalheDaViagem.dataHoraInicial = dataHoraInicial ? this._dateUtil.formatarDataHora(dataHoraInicial) : '';
        this._detalheDaViagem.dataHoraFinal = dataHoraFinal ? this._dateUtil.formatarDataHora(dataHoraFinal) : '';

        this._detalheDaViagem.duracaoTotalDaViagem = dataHoraInicial && dataHoraFinal ? this._dateUtil.obterDuracao(dataHoraInicial,dataHoraFinal) : '';
        let duracaoEmMinutos = servicosDaViagem.reduce((total,servico) => total+servico.duracao ? servico.duracao : 0,0);
        this._detalheDaViagem.duracaoEmMinutos = duracaoEmMinutos ? this._detalheDaViagem.duracaoEmMinutos : '';

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
                                          if(typeof(l.velocidade) == typeof(Number))
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
}

InfoViagemPopup.$inject = [
    '$document',
    'DateUtil',
    'GeocoderHelper',
    'NumberUtil'
];

angular.module('monitriip-web')
        .service('InfoViagemPopup', InfoViagemPopup);
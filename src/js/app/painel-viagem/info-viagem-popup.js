class InfoViagemPopup{
    constructor(document,dateUtil){
        this._dateUtil = dateUtil;
        this._document = document[0];
        this._detalheDaViagem = {};
    }

    exibirDetalhesDaViagem(detalheViagem){
        this._abrirPopup();
        
        if(detalheViagem.length === 0)
            return; 

        this._montarInfoViagem(detalheViagem);
        
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

    _montarInfoViagem(detalheViagem){
        this._detalheDaViagem = detalheViagem[0];
        this._detalheDaViagem.transbordos = detalheViagem.map(servicos => {
            return {
                placaVeiculo:servicos.placaVeiculo,
                dataHoraInicio:this._formatarHorario(servicos.dataHoraInicial),
                dataHoraFim:this._formatarHorario(servicos.dataHoraFinal)
            };
        });
        console.log(this._detalheDaViagem.veiculos.length);
    }

    _formatarHorario(dataHora){
        return this._dateUtil.obterHorario(dataHora);
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

InfoViagemPopup.$inject = ['$document','DateUtil'];

angular.module('monitriip-web')
        .service('InfoViagemPopup', InfoViagemPopup);
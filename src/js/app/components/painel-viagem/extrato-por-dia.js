class ExtratoPorDia{
    constructor(document,numberUtil){
        this._dateUtil = new DateUtil();
        this._numberUtil = numberUtil;
        this.viagens = [];
        this._document = document[0];
    }

    formatarData(data){
        return this._dateUtil.obterDiaEMes(data);
    }

    formatarNumero(numero,casas){
        return this._numberUtil.formatarNumeroDecimal(numero,casas);
    }

    atualizar(event){
        this.extratos = event.datas.filter(data => event[data].extratos.length)
                                    .map(data => this._montarExtratoDoDia(data,event));
    }

    minimizar(index){
        let element = this._document.querySelector(`.minimizar-${index}`);
        element.classList.toggle('none');
    }

    _montarExtratoDoDia(data,event){
        let extratoPorDia = {};
        extratoPorDia.data = this.formatarData(data);
        extratoPorDia.totalKm = this.formatarNumero(event[data].totalKm);
        extratoPorDia.totalBilhetes = event[data].totalBilhetes ? event[data].totalBilhetes : 0;
        extratoPorDia.totalParadas = event[data].totalParadas ? event[data].totalParadas : 0;
        extratoPorDia.totalTempo = this._numberUtil.formatarNumeroDecimal(this._calcularTempoMedioDeViagemPorDia(data,event),0);
        extratoPorDia.viagensExtrato = event[data].extratos;
        extratoPorDia.totalDirecao = event[data].direcoesContinuas
                                                .map(direcao => direcao.tempoMaximo)
                                                .reduce((tempo,maior) => tempo>maior ? tempo : maior,0);
        
        extratoPorDia.maiorTempoJornada = this._obterMaiorTempoJornadaDoDia(data,event);

        return extratoPorDia;
    }

    _calcularTempoMedioDeViagemPorDia(data,event){
        let extratos = event[data].extratos; 
        return extratos.length ? event[data].extratos
                                            .reduce((acc,extrato) => 
                                                acc + extrato.tempo,0) / extratos.length : 0;
    }

    _obterMaiorTempoJornadaDoDia(data,event){

        let maior = event.datas.map(dt => event[dt].jornadas)
                                .reduce((acc,jornadas) => {
                                    jornadas.forEach(j => acc.push(j));
                                    return acc;
                                },[])
                                .reduce((maior,jornada) => {
                                    return jornada.horasPorData && maior < jornada.horasPorData[data] ? jornada.horasPorData[data] : maior;
                                },0);
        
        console.log(maior);
        return maior;
    }
}

ExtratoPorDia.$inject = ['$document','NumberUtil'];

angular.module('monitriip-web')
        .service('ExtratoPorDia', ExtratoPorDia);

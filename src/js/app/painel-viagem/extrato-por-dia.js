
class ExtratoPorDia{
    constructor(document){
        this._dateUtil = new DateUtil();
        this.viagens = [];
        this._document = document[0];
    }

    formatarData(data){
        return this._dateUtil.obterDiaEMes(data);
    }

    formatarNumero(numero){
        if(!numero)
            return 0.0;

        return parseFloat(numero).toFixed(2);
    }

    atualizar(event){

        this.extratos = event.datas.map(data => {
            let extratoPorDia = {}
            extratoPorDia.data = this.formatarData(data);
            extratoPorDia.totalKm = this.formatarNumero(event[data].totalKm);
            extratoPorDia.totalBilhetes = event[data].totalBilhetes ? event[data].totalBilhetes : 0;
            extratoPorDia.totalParadas = event[data].totalParadas ? event[data].totalParadas : 0;
            extratoPorDia.totalTempo = event[data].tempo ? event[data].tempo : 0;
            extratoPorDia.viagensExtrato = event[data].extratos;
            extratoPorDia.totalDirecao = 0;
            extratoPorDia.totalTempoJornada = 0;

            return extratoPorDia;
        });
    }

    minimizar(index){
        let element = this._document.querySelector(`.minimizar-${index}`);
        element.classList.toggle('none');
    }
}

ExtratoPorDia.$inject = ['$document'];

angular.module('monitriip-web')
        .service('ExtratoPorDia', ExtratoPorDia);
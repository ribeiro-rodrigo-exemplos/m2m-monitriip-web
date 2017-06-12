
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
        let totalPorData = {};
        let totalDt = {};
        
        this.extratos = {};
        
        this.extratos = event.datas.map(data => {
            
            let extratoPorDia = {};
            
            event[data].jornadas
                .forEach(jornada => {
                    if(jornada.horasPorData){
                        let array = Object.keys(jornada.horasPorData).sort();

                        array.forEach(dt =>{
                            if (!totalPorData[dt])
                                totalPorData[dt] = jornada.horasPorData[dt];
                            else
                                if(totalPorData[dt] < jornada.horasPorData[dt])
                                    totalPorData[dt] = jornada.horasPorData[dt];
                        });
                    } 
                });

            extratoPorDia.data = this.formatarData(data);
            extratoPorDia.totalKm = this.formatarNumero(event[data].totalKm);
            extratoPorDia.totalBilhetes = event[data].totalBilhetes ? event[data].totalBilhetes : 0;
            extratoPorDia.totalParadas = event[data].totalParadas ? event[data].totalParadas : 0;
            extratoPorDia.totalTempo = event[data].tempo ? event[data].tempo : 0;
            extratoPorDia.viagensExtrato = event[data].extratos;
            extratoPorDia.totalDirecao = event[data].direcoesContinuas
                                                    .map(direcao => direcao.tempoMaximo)
                                                    .reduce((tempo,maior) => tempo>maior ? tempo : maior,0);
            
            extratoPorDia.totalTempoJornada = totalPorData[data];
            
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
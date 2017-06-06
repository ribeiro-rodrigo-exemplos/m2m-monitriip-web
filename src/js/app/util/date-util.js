/**
 * Created by Rodrigo Ribeiro on 25/04/17.
 */
class DateUtil{
    constructor(numberUtil){
        this.meses = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ];

        this._numberUtil = numberUtil;
        this._isoDatePattern = 'YYYY-MM-DD';
        this._horarioPattern = 'HH:mm:ss';
    }

    obterMes(data){
        return this.meses[new Date(data).getMonth()];
    }

    obterDiaEMes(data){

        data = moment(data);
        return `${data.format('DD')} ${this.meses[data.month()]}`;
    }

    obterHorario(dataHora){
        return moment(dataHora).format(this._horarioPattern);
    }

    obterDuracao(dataInicial,dataFinal){
        
        let duracao = this._obterDuracao(dataInicial,dataFinal);
        
        return `${this._numberUtil.formatarNumero(duracao.asHours(),0)}:${this._numberUtil.formatarNumero(duracao.asMinutes(),0)}:${this._numberUtil
            .formatarNumero(duracao.asSeconds(),0)}`;
    }

    obterDuracaoEmHoras(dataInicial,dataFinal){
        
        let duracao = this._obterDuracao(dataInicial,dataFinal);

        return duracao.asHours();
    }

    formatarDataHora(dataHora){
        let dtHora = dataHora.split(" ");
        let data = dtHora[0].split("-");
        return data[2] + "/" + data[1] + "/" + data[0] + " " + dtHora[1];
    }

    formatarParaIsoDate(data){
        return moment(data).format(this._isoDatePattern);
    }

    dentroDoPeriodoDeDias(dataInicial,dataFinal,dias){
        let dataInicialMoment = moment(dataInicial,this._isoDatePattern);
        let dataFinalMoment = moment(dataFinal,this._isoDatePattern);

        return dataFinalMoment.diff(dataInicialMoment,'days') <= dias; 
    }

    periodoValido(dataInicial,dataFinal){
        return dataInicial.getTime() <= dataFinal.getTime();
    }

    _obterDuracao(dataInicial,dataFinal){
        let dataInicialMoment = moment(dataInicial);
        let dataFinalMoment = moment(dataFinal);

        let diferencaEmMs = dataFinalMoment.diff(dataInicialMoment);
        return moment.duration(diferencaEmMs);
    }
}

DateUtil.$inject = ['NumberUtil'];

angular.module('monitriip-web')
        .service('DateUtil',DateUtil);

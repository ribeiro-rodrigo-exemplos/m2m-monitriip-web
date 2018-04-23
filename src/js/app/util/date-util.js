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
        this._ptBrDatePattern = 'DD/MM/YYYY'
        this._horarioPattern = 'HH:mm:ss';
    }

    formatarIsoDatePattern(data){
        let vetData = data.split("/");
        return new Date(vetData[2], vetData[1] - 1, vetData[0]);
    }

    obterMes(data){
        return this.meses[new Date(data).getMonth()];
    }

    obterDiaEMes(data){
        data = moment(data);
        return `${data.format('DD')} ${this.meses[data.month()]}`;
    }

    obterMesEAnoAtual(){
        var data = moment(new Date())
        return `${data.format('YYYY')}-${data.format("MM")}`
    }

    obterHorario(dataHora){
        return moment(dataHora).format(this._horarioPattern);
    }

    obterDuracao(dataInicial,dataFinal){
        
        let duracao = this._obterDuracao(dataInicial,dataFinal);
        
        return `${this._numberUtil.formatarNumero(duracao.asMinutes(),0)}`;
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

    formatarParaPtBr(data){
        return moment(data).format(this._ptBrDatePattern)
    }

    dentroDoPeriodoDeDias(dataInicial,dataFinal,dias){
        let dataInicialMoment = moment(dataInicial,this._isoDatePattern);
        let dataFinalMoment = moment(dataFinal,this._isoDatePattern);

        return dataFinalMoment.diff(dataInicialMoment,'days') < dias; 
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

    _obterPeriodo(dataInicial, dataFinal){
        let dataControle = dataInicial;
        let datas = [moment(dataInicial).format('YYYY-MM-DD')];  

        while(dataControle < dataFinal){
            dataControle = dataControle.add(1,'days');
            datas.push(moment(dataControle).format('YYYY-MM-DD')); 
        }

        return datas;

    }
}

DateUtil.$inject = ['NumberUtil'];

angular.module('monitriip-web')
        .service('DateUtil',DateUtil);

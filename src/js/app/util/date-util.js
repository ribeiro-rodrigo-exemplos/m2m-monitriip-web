/**
 * Created by Rodrigo Ribeiro on 25/04/17.
 */
class DateUtil{
    constructor(){
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
    }

    obterMes(data){
        return this.meses[new Date(data).getMonth()];
    }

    obterDiaEMes(data){

        data = moment(data);
        return `${data.format('DD')} ${this.meses[data.month()]}`;
    }

    formatarDataHora(dataHora){
        let dtHora = dataHora.split(" ");
        let data = dtHora[0].split("-");
        return data[2] + "/" + data[1] + "/" + data[0] + " " + dtHora[1];
    }
}

angular.module('monitriip-web')
        .service('DateUtil',DateUtil);

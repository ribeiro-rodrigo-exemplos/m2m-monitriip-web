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
}

angular.module('monitriip-web')
        .service('DateUtil',DateUtil);

class NumberUtil{
    formatarNumero(numero){
        return numeral(numero).format('00');
    }
}

angular.module('monitriip-web')
        .service('NumberUtil',NumberUtil);
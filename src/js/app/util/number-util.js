class NumberUtil{
    formatarNumero(numero){
        return numeral(numero).format('00');
    }

    formatarNumeroComDuasCasasDecimais(numero){
        return numeral(numero).format('0.00');
    }
}

angular.module('monitriip-web')
        .service('NumberUtil',NumberUtil);
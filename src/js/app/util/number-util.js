class NumberUtil{
    formatarNumero(numero){
        return numeral(numero).format('00');
    }

    formatarNumeroDecimal(numero,casas){
        if(!numero)
            return 0.0;

        return parseFloat(numero).toFixed(casas === undefined ? 2 : casas);
    }

    formatarNumeroComDuasCasasDecimais(numero){
        return numeral(numero).format('0.00');
    }
}

angular.module('monitriip-web')
        .service('NumberUtil',NumberUtil);
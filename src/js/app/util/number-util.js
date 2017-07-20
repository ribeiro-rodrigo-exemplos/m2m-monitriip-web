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

    formatarNumeroComDuasCasasDecimaisComVirgula(numero){
        if(!numero)
            return 0.00;

        let numeroFormatado = "";
        let num = numero.toString().split(".");

        if(num[1].length > 2)
            return numeroFormatado = num[0] + "," + num.slice(0,2);
        else if(num[1].length == 1)
            return numeroFormatado = num[0] + "," + num[1] + "0";
        else
            return numero.replace(".", ",");
        
    }

}

angular.module('monitriip-web')
        .service('NumberUtil',NumberUtil);
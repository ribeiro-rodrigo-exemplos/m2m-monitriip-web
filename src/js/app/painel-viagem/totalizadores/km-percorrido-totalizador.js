/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class KmPercorridoTotalizador extends Totalizador{
    constructor(){
        super();
    }

    set kmPercorrido(km){
        this.grafico.series[0].data = km;
    }
}

angular.module('monitriip-web')
        .service('KmPercorridoTotalizador',KmPercorridoTotalizador);
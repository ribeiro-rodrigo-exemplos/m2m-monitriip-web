/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class KmPercorridoTotalizador extends Totalizador{
    constructor(){
        super();

        this.total = 0;
    }

    atualizar(totalizadores){

        this.criarGrafico(totalizadores.map(totalizador => totalizador.totalQuilometragem));

        this.datas = totalizadores.map(totalizador => {
            return {dia:this.formatarData(totalizador._id),total:this.formatarNumero(totalizador.totalQuilometragem)};
        });

        this.total = this.formatarNumero(this.datas.reduce((total,data) => total+data.total,0));
    }
}

angular.module('monitriip-web')
        .service('KmPercorridoTotalizador',KmPercorridoTotalizador);
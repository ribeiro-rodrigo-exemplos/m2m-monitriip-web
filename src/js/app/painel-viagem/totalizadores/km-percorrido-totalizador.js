/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class KmPercorridoTotalizador extends Totalizador{
    constructor(){
        super();

        this.total = 0;
    }

    atualizar(event){

        this.criarGrafico(event.totalizadores.map(totalizador => totalizador.totalQuilometragem));

        this.datas = event.totalizadores.map(totalizador => {
            return {dia:this.formatarData(totalizador._id),total:this.formatarNumero(totalizador.totalQuilometragem)};
        });

        this.total = this.formatarNumero(this.datas.reduce((total,data) => total+parseFloat(data.total),0));
    }
}

angular.module('monitriip-web')
        .service('KmPercorridoTotalizador',KmPercorridoTotalizador);
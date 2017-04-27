/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class LeituraBilhetesTotalizador extends Totalizador{
    constructor(){
        super();

        this.total = 0;
    }

    atualizar(event){

        this.criarGrafico(event.totalizadores.map(totalizador => totalizador.totalBilhetes));

        this.datas = event.totalizadores.map(totalizador => {
            return {dia:this.formatarData(totalizador._id),total:totalizador.totalBilhetes};
        });

        this.total = this.datas.reduce((total,data) => total+data.total,0);
    }
}

angular.module('monitriip-web')
        .service('LeituraBilhetesTotalizador', LeituraBilhetesTotalizador);
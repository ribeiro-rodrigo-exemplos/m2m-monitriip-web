/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class TempoViagemTotalizador extends Totalizador{
    constructor(){
        super();

        this.media = 0;
    }

    atualizar(event){

        this.criarGrafico(event.totalizadores.map(totalizador => totalizador.totalTempo));

        this.datas = event.totalizadores.map(totalizador => {
            return {dia:this.formatarData(totalizador._id),total:totalizador.totalTempo};
        });

        let total = this.formatarNumero(this.datas.reduce((total,data) => total+data.total,0));
        
        this.media = total / this.datas.length;
    }
}

angular.module('monitriip-web')
        .service('TempoViagemTotalizador', TempoViagemTotalizador);
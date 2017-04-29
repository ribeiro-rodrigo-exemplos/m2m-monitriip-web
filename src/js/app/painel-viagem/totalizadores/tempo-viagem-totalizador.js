/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class TempoViagemTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.media = 0;
    }

    atualizar(event){

        let objeto = {
            name:"Tempo Viagem",
            data:[]
        };

        this.criarGrafico(event.dias.map(dia => {
            return dia.totalizadores.totalTempo;
        }));
        
        this.datas = event.dias.map(dia => {
            objeto.data.push(dia.totalizadores.totalTempo);
            return {dia:this.formatarData(dia.data),total:dia.totalizadores.totalTempo};
        });

        let total = this.formatarNumero(this.datas.reduce((total,data) => total+data.total,0));
        
        this.media = total / this.datas.length;

        this.graficoGeral.mediaTempoViagem = objeto;
    }
}

TempoViagemTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('TempoViagemTotalizador', TempoViagemTotalizador);
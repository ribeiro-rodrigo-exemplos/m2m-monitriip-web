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

        this.totalizadoresPorData = event.datas.map(data => {
            let totalizador = {data:this.formatarData(data),mediaTempoViagem:0};
            if(event[data].tempo){
                totalizador.mediaTempoViagem = event[data].tempo;
                this.media += parseFloat(totalizador.mediaTempoViagem);
            } 
            objeto.data.push(totalizador.mediaTempoViagem);           
            return totalizador;
        });

        this.media = this.formatarNumero(this.media/event.datas.length,0);
        this.criarGrafico(this.totalizadoresPorData.map(t => parseFloat(t.mediaTempoViagem)));
        this.trocarCorLinhaGrafico("#358fcd");

        this.graficoGeral.mediaTempoViagem = objeto;
    }
}

TempoViagemTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('TempoViagemTotalizador', TempoViagemTotalizador);
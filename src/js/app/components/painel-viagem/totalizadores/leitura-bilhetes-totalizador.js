/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class LeituraBilhetesTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this._total = 0;
    }

    atualizar(event){

        let objeto = {
            name:"Bilhetes",
            data:[]
        };

        this._total = 0;

        this.totalizadoresPorData = event.datas.map(data => {
            let totalizador = {data:this.formatarData(data),totalBilhetes:0};
            if(event[data].totalBilhetes){
                totalizador.totalBilhetes = event[data].totalBilhetes;
                this._total += event[data].totalBilhetes;
            } 
            objeto.data.push(totalizador.totalBilhetes);           
            return totalizador;
        });

        this.criarGrafico(this.totalizadoresPorData.map(t => parseFloat(t.totalBilhetes)));
        this.trocarCorLinhaGrafico("#cb3f7e");

        this.graficoGeral.totalizadorLeituraBilhetes = objeto;
    }

    get total(){
        return this._total;
    }
}

LeituraBilhetesTotalizador.$inject = ["GraficoGeral"];

angular.module('monitriip-web')
        .service('LeituraBilhetesTotalizador', LeituraBilhetesTotalizador);
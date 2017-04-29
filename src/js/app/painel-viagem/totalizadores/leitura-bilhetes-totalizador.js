/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class LeituraBilhetesTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.total = 0;
    }

    atualizar(event){

        let objeto = {
            name:"Leitura de Bilhetes",
            data:[]
        };

        this.criarGrafico(event.dias.map(dia => {
            return dia.totalizadores.totalBilhetes;
        }));

        this.datas = event.dias.map(dia => {
            objeto.data.push(dia.totalizadores.totalBilhetes);
            return {dia:this.formatarData(dia.data),total:dia.totalizadores.totalBilhetes};
        });

        this.total = this.datas.reduce((total,data) => total+data.total,0);

        this.graficoGeral.totalizadorLeituraBilhetes = objeto;
    }
}

LeituraBilhetesTotalizador.$inject = ["GraficoGeral"];

angular.module('monitriip-web')
        .service('LeituraBilhetesTotalizador', LeituraBilhetesTotalizador);
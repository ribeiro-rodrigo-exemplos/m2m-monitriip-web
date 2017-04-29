/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class KmPercorridoTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.total = 0;
    }

    atualizar(event){

        let objeto = {
            name:"Km Percorrido",
            data:[]
        };

        this.criarGrafico(event.dias.map(dia => {
            return dia.totalizadores.totalQuilometragem;
        }));
        

        this.datas = event.dias.map(dia => {
            objeto.data.push(parseFloat(this.formatarNumero(dia.totalizadores.totalQuilometragem)));
            this.graficoGeral.dias.push(this.formatarData(dia.data));
            return {dia:this.formatarData(dia.data),total:this.formatarNumero(dia.totalizadores.totalQuilometragem)};
        });

        this.total = this.formatarNumero(this.datas.reduce((total,data) => total+parseFloat(data.total),0));

        this.graficoGeral.totalizadorKmPercorrido = objeto;
    }
}

KmPercorridoTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('KmPercorridoTotalizador',KmPercorridoTotalizador);
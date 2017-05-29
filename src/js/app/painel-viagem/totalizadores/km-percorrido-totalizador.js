/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class KmPercorridoTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this._total = 0;
    }

    atualizar(event){
        let objeto = {
            name:"Km Percorrido",
            data:[]
        };

        this._total = 0;

        this.totalizadoresPorData = event.datas.map(data => {
            let totalizador = {data:this.formatarData(data),totalKm:0};
            if(event[data].totalKm){
                totalizador.totalKm = this.formatarNumero(event[data].totalKm);
                this._total += parseFloat(totalizador.totalKm);
            } 
            objeto.data.push(parseFloat(totalizador.totalKm));           
            return totalizador;
        });

        this._total = this.formatarNumero(this._total);
        this.criarGrafico(this.totalizadoresPorData.map(t => parseFloat(t.totalKm)));
        this.trocarCorLinhaGrafico("#0bb48d");

        this.graficoGeral.totalizadorKmPercorrido = objeto;
    }

    get total(){
        return this._total;
    }
}

KmPercorridoTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('KmPercorridoTotalizador',KmPercorridoTotalizador);
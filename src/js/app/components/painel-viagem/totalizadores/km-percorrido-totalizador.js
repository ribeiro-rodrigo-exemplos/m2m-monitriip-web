/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class KmPercorridoTotalizador extends Totalizador{
    constructor(graficoGeral,eventBus, NumberUtil){
        super();

        this.graficoGeral = graficoGeral;
        this._numberUtil = NumberUtil;
        this._total = 0;

        eventBus.on('event:painel:update',this._atualizar.bind(this));
    }

    get total(){
        return this._total;
    }

    _atualizar(event){
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
            totalizador.totalKm = this._numberUtil.formatarNumeroComDuasCasasDecimaisComVirgula(totalizador.totalKm);
            return totalizador;
        });

        this._total = this.formatarNumero(this._total);
        this._total = this._numberUtil.formatarNumeroComDuasCasasDecimaisComVirgula(this._total);
        this.criarGrafico(this.totalizadoresPorData.map(t => parseFloat(t.totalKm)));
        this.trocarCorLinhaGrafico("#0bb48d");

        this.graficoGeral.totalizadorKmPercorrido = objeto;
    }
}

KmPercorridoTotalizador.$inject = ['GraficoGeral','EventBusService', 'NumberUtil'];

angular.module('monitriip-web')
        .service('KmPercorridoTotalizador',KmPercorridoTotalizador);
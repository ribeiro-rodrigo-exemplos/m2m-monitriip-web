
class ParadasTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.combo = [];
        this.total = 0; 
    }

    atualizar(event){
        
        let dia = "";
        let total = 0;

        let objeto = {
            name:"Detector Paradas",
            data:[]
        };

        this.combo = event.paradasCombo;

        this.criarGrafico(event.dias.map(dia => {
            return dia.totalizadores.totalParadas;
        }));
        
        
        this.datas = event.dias.map(dia => {
            objeto.data.push(parseFloat(this.formatarNumero(dia.totalizadores.totalParadas)));

            return {dia:this.formatarData(dia.data),total:dia.totalizadores.totalParadas};
        });

        this.total = this.datas.reduce((total,data) => total+parseFloat(data.total),0);

        this.graficoGeral.totalizadorParadas = objeto;
        
    }
}

ParadasTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('ParadasTotalizador', ParadasTotalizador); 

class ParadasTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.combo = [];
        this.event = [];
        this.total = 0; 
    }

    atualizar(event){
        
        let dia = "";
        let total = 0;

        let objeto = {
            name:"Detector Paradas",
            data:[]
        };

        this.event = event;
        this.combo = this.event.paradasCombo;

        this.criarGrafico(this.event.dias.map(dia => {
            return dia.totalizadores.totalParadas;
        }));
        
        
        this.datas = this.event.dias.map(dia => {
            objeto.data.push(parseFloat(this.formatarNumero(dia.totalizadores.totalParadas)));
           return {dia:this.formatarData(dia.data),total:dia.totalizadores.totalParadas};
        });

        if (this.combo[0] != "TODOS"){
            this.combo.splice(0, 0, "TODOS");
        }

        this.total = this.datas.reduce((total,data) => total+parseFloat(data.total),0);

        this.graficoGeral.totalizadorParadas = objeto;
        
    }

    buscaCombo(motivo){
        let grafico = [];
        let total = 0;
        this.datas = [];
        
        if(motivo != "TODOS"){
            this.event.dias.forEach(dia =>{
                total = 0;
                dia.paradas.forEach(parada =>{
                    if(parada.motivo == motivo){
                        total++;
                    }
                });
                grafico.push(total);
                this.datas.push({dia:this.formatarData(dia.data),total:total});
            });

            this.criarGrafico(grafico);

            this.total = this.datas.reduce((total,data) => total+data.total,0);

        }else{
            this.atualizar(this.event);
        }
    }
}

ParadasTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('ParadasTotalizador', ParadasTotalizador); 
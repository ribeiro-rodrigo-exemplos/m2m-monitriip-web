/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class JornadaTrabalhoTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.combo = [];
        this.event = [];
        this.total = 0; 
    }

    atualizar(event){
        
        let objeto = {
            name:"Jornada Trabalho",
            data:[]
        };
        
        this.event = event;
        this.combo = this.event.motoristasCombo;


        this.datas = this.event.dias.map(dia => {
            objeto.data.push(dia.totalizadores.totalJornadas); 
            if (this.combo[0] != "Todos"){
                return {dia:this.formatarData(dia.data),total:dia.totalizadores.totalJornadas};
            }else{
                return {dia:dia.data,total:dia.totalizadores.totalJornadas};
            }
        });

        if (this.combo[0] != "Todos"){
            this.combo.splice(0, 0, "Todos");
        }

        this.criarGrafico(this.datas.map(data => data.total));

        this.total = this.datas.reduce((total,data) => total+data.total,0);

        this.graficoGeral.totalizadorJornada = objeto;
        
    }

    buscaCombo(motorista){
        let grafico = [];
        this.datas = [];
        
        if(motorista != "Todos"){
            this.event.dias.forEach(dia =>{
                dia.jornadas.forEach(jornada =>{
                    if(jornada.motorista == motorista){
                        grafico.push(jornada.duracao);
                        this.datas.push({dia:dia.data,total:jornada.duracao});
                    }
                });
            });

            this.criarGrafico(grafico);

            this.total = this.datas.reduce((total,data) => total+data.total,0);

        }else{
            this.atualizar(this.event);
        }
    }
}

JornadaTrabalhoTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('JornadaTrabalhoTotalizador', JornadaTrabalhoTotalizador); 
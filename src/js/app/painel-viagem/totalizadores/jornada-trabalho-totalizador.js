/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class JornadaTrabalhoTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.total = 0; 
    }

    atualizar(event){
        
        let dia = "";
        let total = 0;

        let objeto = {
            name:"jornadaTrabalho",
            data:[]
        };
        
        this.datas = event.dias.map(dia => {
            this.total = dia.jornadas.reduce((total,data) => total+data.duracao,0);
            objeto.data.push(dia.jornadas.reduce((total,data) => total+data.duracao,0)); 
            return {dia:dia.data,total:this.total};
        });

        this.criarGrafico(this.datas.map(data => data.total));

        //this.total = this.datas.reduce((total,data) => total+data.total,0);

        this.graficoGeral.totalizadorJornada = objeto;
        
    }
}

JornadaTrabalhoTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('JornadaTrabalhoTotalizador', JornadaTrabalhoTotalizador); 
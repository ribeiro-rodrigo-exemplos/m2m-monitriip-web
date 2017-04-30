/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class DirecaoContinuaTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.combo = [];
        this.total = 0; 
    }

    atualizar(event){
        
        let maximo = 0;
        
        let objeto = {
            name:"Direção Contínua",
            data:[]
        };

        this.combo = event.motoristasCombo;

        this.datas = event.dias.map(dia => {

            if (dia.totalizadores.totalDirecao > maximo){
                maximo = dia.totalizadores.totalDirecao;
            }
            
            objeto.data.push(maximo);
            return {dia:this.formatarData(dia.data),direcaoMaxima:maximo};
        
        });

        this.criarGrafico(event.dias.map(dia => {
            return dia.totalizadores.totalDirecao;
        }));

        this.total = maximo;

        this.graficoGeral.totalizadorDirecaoContinua = objeto;
        
    }
}

DirecaoContinuaTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('DirecaoContinuaTotalizador', DirecaoContinuaTotalizador); 
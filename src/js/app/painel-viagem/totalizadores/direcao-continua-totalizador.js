/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class DirecaoContinuaTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;

        this.total = 0; 
    }

    atualizar(event){
        
        let maximo = 0;
        
        let objeto = {
            name:"Direção Contínua",
            data:[]
        };

        let arrayDias = [];

        this.datas = event.dias.map(dia => {

            dia.direcoes.forEach(direcao =>{
                if(direcao.direcaoContinuaMaxima > maximo){
                    maximo = direcao.direcaoContinuaMaxima;
                }
            });
            
            return {dia:this.formatarData(dia.data),direcaoMaxima:maximo};
        
        });

        objeto.data.push(maximo);
        

        this.criarGrafico(this.datas.map(data => data.direcaoMaxima));

        this.total = this.datas.reduce((total,data) => total+data.direcaoMaxima,0);

        this.graficoGeral.totalizadorDirecaoContinua = objeto;
        this.graficoGeral.dias = arrayDias;
        
    }
}

DirecaoContinuaTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('DirecaoContinuaTotalizador', DirecaoContinuaTotalizador); 
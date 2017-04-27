/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class DirecaoContinuaTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this._graficoGeral = graficoGeral;

        this.total = 0; 
    }

    atualizar(event){
        
        let dia = "";
        let maximo = 0;
        
        this.datas = event.totalizadores.map(totalizador => {
            dia = this.formatarData(totalizador._id);

            totalizador.direcoes.forEach(direcao =>{
                if (direcao.direcaoContinuaMaxima > maximo){
                    maximo = direcao.direcaoContinuaMaxima;
                }
            });

            return {dia:dia,direcaoMaxima:maximo};
        });

        this.criarGrafico(this.datas.map(data => data.direcaoMaxima));

        this.total = this.formatarNumero(this.datas.reduce((total,data) => total+data.direcaoMaxima,0.0));

        this._graficoGeral.totalizadorDirecaoMaxima = this.total;
        
    }
}

DirecaoContinuaTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('DirecaoContinuaTotalizador', DirecaoContinuaTotalizador); 
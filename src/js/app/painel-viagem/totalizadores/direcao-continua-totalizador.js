/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class DirecaoContinuaTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.combo = [];
        this.event = [];
        this.total = 0;
    }

    atualizar(event){
        
        let maximo = 0;
        
        let objeto = {
            name:"Direção Contínua",
            data:[]
        };

        this.event = event;
        this.combo = event.motoristasCombo;


        this.datas = event.dias.map(dia => {
            if (dia.totalizadores.totalDirecao > maximo){
                maximo = dia.totalizadores.totalDirecao;
            }
            
            objeto.data.push(maximo);
            
            if (this.combo[0] != "Todos"){
                return {dia:this.formatarData(dia.data),direcaoMaxima:maximo};
            }else{
                return {dia:dia.data,direcaoMaxima:maximo};
            }
        });
        
        if (this.combo[0] != "Todos"){
            this.combo.splice(0, 0, "Todos");
        }

        this.criarGrafico(event.dias.map(dia => {
            return dia.totalizadores.totalDirecao;
        }));

        this.total = maximo;

        this.graficoGeral.totalizadorDirecaoContinua = objeto;
        
    }

    buscaCombo(motorista){
        let maximo = 0;
        let grafico = [];
        this.datas = [];
        
        if(motorista != "Todos"){
            this.event.dias.forEach(dia =>{
                dia.direcoes.forEach(direcao =>{
                    if(direcao.motorista == motorista){
                        if (direcao.direcaoContinuaMaxima > maximo){
                            maximo = direcao.direcaoContinuaMaxima;
                        }
                        grafico.push(direcao.direcaoContinuaMaxima);
                        this.datas.push({dia:dia.data,direcaoMaxima:direcao.direcaoContinuaMaxima});
                    }
                });
            });

            this.criarGrafico(grafico);

            this.total = maximo;

        }else{
            this.atualizar(this.event);
        }
    }
}

DirecaoContinuaTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('DirecaoContinuaTotalizador', DirecaoContinuaTotalizador); 
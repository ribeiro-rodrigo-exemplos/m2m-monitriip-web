/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class JornadaTrabalhoTotalizador extends Totalizador{
    constructor(){
        super();

        this.total = 0; 
    }

    atualizar(event){
        
        let dia = "";
        
        this.datas = event.jornadas.map(jornada => {
            dia = this.formatarData(jornada._id);

            let duracaoTotal = 0;

            jornada.jornadaMotoristas.forEach(jornadaMotorista =>{
                duracaoTotal = duracaoTotal + jornadaMotorista.duracao; 
            });

            return {dia:dia,total:duracaoTotal};
        });

        this.criarGrafico(this.datas.map(data => data.total));

        this.total = this.formatarNumero(this.datas.reduce((total,data) => total+data.total,0));
        
    }
}

angular.module('monitriip-web')
        .service('JornadaTrabalhoTotalizador', JornadaTrabalhoTotalizador); 
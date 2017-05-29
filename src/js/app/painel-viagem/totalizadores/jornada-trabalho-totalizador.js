/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */

class JornadaTrabalhoTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.jornadaTrabalhoMaxima = 0;
    }

    atualizar(event){

        this._ultimoEvento = event;

        let valores = [];
        let jornadaTrabalhoMaxima = [];

        if(!this._motoristas)
            this._montarComboDeMotoristas(event);
        
        this.jornadasTrabalho = event.datas.map(data => {
            return {
                data:this.formatarData(data),
                maxima:event[data].jornadas
                                    .filter(this._filtrarMotorista.bind(this))
                                    .map(jornada => {
                                        if(jornada.horasPorData){
                                            let array = Object.keys(jornada.horasPorData).sort();

                                            array.forEach(dt =>{
                                                valores.push(jornada.horasPorData[dt]);
                                            });

                                            return valores;
                                        } 
                                    }) 
                                    .reduce(this._obterMaiorJornada,0)
            };
        });
        
        event.datas.forEach(data => {            
            jornadaTrabalhoMaxima.push(event[data].jornadas
                                            .map(jornada => {
                                                if(jornada.horasPorData){
                                                    let array = Object.keys(jornada.horasPorData).sort();

                                                    array.forEach(dt =>{
                                                        valores.push(jornada.horasPorData[dt]);
                                                    });

                                                    return valores;
                                                } 
                                            }) 
                                            .reduce(this._obterMaiorJornada,0));
        });

        this.jornadaTrabalhoMaxima = Math.max.apply(Math, jornadaTrabalhoMaxima);

        this.trocarCorLinhaGrafico("#ec6051");
        this.criarGrafico(this.jornadasTrabalho.map(jornada => jornada.maxima));

        let objeto = {
            name:"Jornada de Trabalho",
            data:[]
        };

        this.jornadasTrabalho.forEach(jornada => objeto.data.push(parseFloat(jornada.maxima)));

        this.graficoGeral.totalizadorJornada = objeto; 
     }

    get motoristas(){
        return this._motoristas;
    }

    get motoristaSelecionado(){
        return this._motoristaSelecionado;
    }

    set motoristaSelecionado(motorista){
        this._motoristaSelecionado = motorista;
        this.atualizar(this._ultimoEvento);
    }

    _montarComboDeMotoristas(event){
        this._motoristas = new Set();

        event.datas.forEach(data => {
            if(event[data].jornadas)
                event[data].jornadas
                           .forEach(jornada => this._motoristas.add(jornada.cpfMotorista));
        });

        this._motoristas = ['Todos'].concat([...this._motoristas.values()]);
        this._motoristaSelecionado = this._motoristas[0];
    }

    _filtrarMotorista(jornada){
        return this._motoristaSelecionado == "Todos" || this._motoristaSelecionado == jornada.cpfMotorista;
    }

    _obterMaiorJornada(tempo,valor){
        let maior = 0;
        
        if(valor){            
            valor.forEach(val =>{
                maior = tempo > val ? tempo : val;
            });
        }

        return maior;
    }
}

JornadaTrabalhoTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('JornadaTrabalhoTotalizador', JornadaTrabalhoTotalizador);
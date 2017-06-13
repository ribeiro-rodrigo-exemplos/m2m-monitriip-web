class JornadaTrabalhoTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.jornadaTrabalhoMaxima = 0;
    }

    atualizar(event, montarCombo = true){

        this._ultimoEvento = event;

        let totalPorData = {};

        if(montarCombo)
            this._montarComboDeMotoristas(event);
                
        this.jornadasTrabalho = event.datas.map(data => {
           event[data].jornadas
                .filter(this._filtrarMotorista.bind(this))
                .map(jornada => {
                    if(jornada.horasPorData){
                        let array = Object.keys(jornada.horasPorData).sort();

                        array.forEach(dt =>{
                            if (!totalPorData[dt])
                                totalPorData[dt] = jornada.horasPorData[dt];
                            else
                                if(totalPorData[dt] < jornada.horasPorData[dt])
                                    totalPorData[dt] = jornada.horasPorData[dt];
                        });
                        return totalPorData;
                    }
                });

            return {
                data: this.formatarData(data),
                maxima: totalPorData[data] ? totalPorData[data] : 0
            };
        });
        
        this.jornadaTrabalhoMaxima = this.jornadasTrabalho
                                         .map(jornada => jornada.maxima)
                                         .reduce(this._obterMaiorJornada,0);

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
        this.atualizar(this._ultimoEvento, false);
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

    _obterMaiorJornada(tempo,maior){
        return tempo > maior ? tempo : maior;
    }
}

JornadaTrabalhoTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('JornadaTrabalhoTotalizador', JornadaTrabalhoTotalizador);
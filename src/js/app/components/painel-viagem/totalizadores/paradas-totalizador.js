
class ParadasTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this._total = 0;
    }

    atualizar(event, montarCombo = true){

        this._ultimoEvento = event;
        this._total = 0;

        if(montarCombo)
            this._montarComboDeParadas(event);

        this._totalPorData = event.datas
                                    .map(data => {
                                        let total = event[data][this._reverterFormatacaoDeNome(this._paradaSelecionada)];
                                        
                                        if(this._paradaSelecionada == "Todos")
                                            total = event[data].totalParadas || 0;
                                        else
                                            if(!total)
                                                total = 0;
                                        
                                        this._total += total;

                                        return {total:total,data:this.formatarData(data)};
                                    });

        let objeto = {
            name:"Detector Paradas",
            data:[]
        }; 

        this.criarGrafico(this._totalPorData.map(totalizador => {
            objeto.data.push(parseFloat(this.formatarNumero(totalizador.total)));
            return totalizador.total;
        }));

        this.trocarCorLinhaGrafico("#e18e18");

        this.graficoGeral.totalizadorParadas = objeto; 
    }

    get total(){
        return this._total;
    }

    get paradas(){
        return this._paradas;
    }

    get totalPorData(){
        return this._totalPorData;
    }

    get paradaSelecionada(){
        return this._paradaSelecionada;
    }

    set paradaSelecionada(parada){
        this._paradaSelecionada = parada;
        this.atualizar(this._ultimoEvento, false);
    }

    _montarComboDeParadas(event){
        this._paradas = new Set();

        event.datas.forEach(data => {
            if(event[data].paradas)
                event[data].paradas
                           .forEach(parada => this._paradas.add(parada));
        });

        this._paradas = ['Todos']
                                .concat([...this._paradas.values()]
                                .map(this._formatarNome.bind(this)));

        this._paradaSelecionada = this._paradas[0];
    }

    _formatarNome(parada){
        return parada.split('_').join(' ');
    }

    _reverterFormatacaoDeNome(parada){
       parada =  parada.split(' ').join('_');
       return parada;
    }
}

ParadasTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('ParadasTotalizador', ParadasTotalizador); 
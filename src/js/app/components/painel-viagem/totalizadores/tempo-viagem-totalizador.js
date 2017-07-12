/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class TempoViagemTotalizador extends Totalizador{
    constructor(graficoGeral,eventBus){
        super();

        this.graficoGeral = graficoGeral;
        this._media = 0;

        eventBus.on('event:painel:update',this._atualizar.bind(this));
    }

    get media(){
        return this._media; 
    }

    _atualizar(event){
        let objeto = {
            name:"Tempo Viagem",
            data:[]
        };

        this._media = 0;

        this.totalizadoresPorData = event.datas.map(data => {
            let totalizador = {data:this.formatarData(data),mediaTempoViagem:0};
            if(event[data].tempo){
                let media = this._calcularTempoMedioDeViagemPorDia(data,event);
                totalizador.mediaTempoViagem = this.formatarNumero(media,0);
                this._media += media;
            } 
            objeto.data.push(parseFloat(totalizador.mediaTempoViagem));           
            return totalizador;
        });

        this._media = event.datas.length ? this.formatarNumero(this._media/event.datas.length,0) : 0;
        this.criarGrafico(this.totalizadoresPorData.map(t => parseFloat(t.mediaTempoViagem)));
        this.trocarCorLinhaGrafico("#358fcd");

        this.graficoGeral.mediaTempoViagem = objeto;
    }

    _calcularTempoMedioDeViagemPorDia(data,event){
        let extratos = event[data].extratos; 
        return extratos.length ? event[data].extratos
                                            .reduce((acc,extrato) => 
                                                acc + extrato.tempo,0) / extratos.length : 0;
    }
}

TempoViagemTotalizador.$inject = ['GraficoGeral','EventBusService'];

angular.module('monitriip-web')
        .service('TempoViagemTotalizador', TempoViagemTotalizador);
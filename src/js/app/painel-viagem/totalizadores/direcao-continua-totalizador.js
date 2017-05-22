/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class DirecaoContinuaTotalizador extends Totalizador{
    constructor(graficoGeral){
        super();

        this.graficoGeral = graficoGeral;
        this.direcaoContinuaMaxima = 0;
    }

    atualizar(event){

        this._ultimoEvento = event;

        if(!this._motoristas)
            this._montarComboDeMotoristas(event);
        
        this.direcoesContinuas = event.datas.map(data => {
            return {
                data:this.formatarData(data),
                maxima:event[data].direcoesContinuas
                                    .filter(this._filtrarMotorista.bind(this))
                                    .map(direcao => direcao.tempoMaximo)
                                    .reduce(this._obterMaiorDirecao,0)
            };
        });

        this.direcaoContinuaMaxima = this.direcoesContinuas
                                         .map(direcao => direcao.maxima)
                                         .reduce(this._obterMaiorDirecao,0);

        this.trocarCorLinhaGrafico("#9157ab");
        this.criarGrafico(this.direcoesContinuas.map(direcao => direcao.maxima));

        let objeto = {
            name:"Direção Contínua",
            data:[]
        };

        this.direcoesContinuas.forEach(direcao => objeto.data.push(parseFloat(direcao.maxima)));

        this.graficoGeral.totalizadorDirecaoContinua = objeto; 
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
            if(event[data].direcoesContinuas)
                event[data].direcoesContinuas
                           .forEach(direcao => this._motoristas.add(direcao.cpfMotorista));
        });

        this._motoristas = ['Todos'].concat([...this._motoristas.values()]);
        this._motoristaSelecionado = this._motoristas[0];
    }

    _filtrarMotorista(direcao){
        return this._motoristaSelecionado == "Todos" || this._motoristaSelecionado == direcao.cpfMotorista;
    }

    _obterMaiorDirecao(tempo,maior){
        return tempo > maior ? tempo : maior;
    }
}

DirecaoContinuaTotalizador.$inject = ['GraficoGeral'];

angular.module('monitriip-web')
        .service('DirecaoContinuaTotalizador', DirecaoContinuaTotalizador); 
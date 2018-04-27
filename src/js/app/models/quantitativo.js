class Quantitativo{
    constructor(properties){
        this._properties = properties; 
    }

    get linha(){
        return this._properties.linha; 
    }

    get qtdVelocidadeTempo(){
        return this._obterValor(this._properties.resultado.qtdVelocidadeTempo); 
    }

    get qtdJornadas(){
        return this._obterValor(this._properties.resultado.qtdJornadas); 
    }

    get qtdDetectorParada(){
        return this._obterValor(this._properties.resultado.qtdDetectorParada);
    } 

    get qtdInicioFimViagem(){
        return this._obterValor(this._properties.resultado.qtdInicioFimViagem);
    } 

    get qtdInicioFimViagemFretado(){
        return this._obterValor(this._properties.resultado.qtdInicioFimViagemFretado);
    }

    get qtdBilheteEmbarque(){
        return this._obterValor(this._properties.resultado.qtdBilheteEmbarque);
    } 
        
    get qtdVendaPassagem(){
        return this._obterValor(this._properties.resultado.qtdVendaPassagem);
    }

    get qtdViagensValidas(){
        return this._obterValor(this._properties.resultado.qtdViagensValidas);
    } 

    get qtdViagensProgramadas(){
        return this._obterValor(this._properties.resultado.qtdViagensProgramadas);
    }
            
    get qtdCancelamentoPassagem(){
        return this._obterValor(this._properties.resultado.qtdCancelamentoPassagem);
    }

    get percentualDeViagensPlanejadasExecutadas(){
        if(this.qtdViagensProgramadas == 0){
            return 0
        }
        var percentual = this.qtdViagensValidas * 100 / this.qtdViagensProgramadas; 
        return percentual; 
    }

    toJson(){
        return {
            linha: this.linha,
            qtdVelocidadeTempo: this.qtdVelocidadeTempo,
            qtdJornadas: this.qtdJornadas, 
            qtdDetectorParada: this.qtdDetectorParada,
            qtdInicioFimViagem: this.qtdInicioFimViagem, 
            qtdInicioFimViagemFretado: this.qtdInicioFimViagemFretado, 
            qtdBilheteEmbarque: this.qtdBilheteEmbarque, 
            qtdVendaPassagem: this.qtdVendaPassagem, 
            qtdCancelamentoPassagem: this.qtdCancelamentoPassagem, 
            qtdViagensProgramadas: this.qtdViagensProgramadas, 
            qtdViagensValidas: this.qtdViagensValidas, 
            percentualExecutadasEPlanejadas: this.percentualDeViagensPlanejadasExecutadas
        }; 
    }

    _obterValor(campo){
        return campo == undefined ? 0 : campo; 
    }
}

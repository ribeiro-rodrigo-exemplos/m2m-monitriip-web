class Bilhete{
    constructor(properties, numberUtil){
        this._properties = properties;
        this._numberUtil = numberUtil;
    }

    carregarLocalizacao(locationStrategy){
        if(this.longitude && this.latitude)
            locationStrategy(this.longitude,this.latitude)
                .then(endereco => this._properties.enderecoLeitura = endereco);
    }

    get enderecoLeitura(){
        return this._properties.enderecoLeitura;
    }

    get dataHoraLeitura(){
        return this._properties.dataHoraEvento;
    }

    get numeroDeEmbarque(){
        return this._properties.numeroBilheteEmbarque;
    }
    
    get codigoDesconto(){
        return this._properties.codigoDesconto;
    }

    get percentualDesconto(){
        return this._properties.percentualDesconto;
    }

    get celularPassageiro(){
        return this._properties.celularPassageiro;
    }

    get valorTarifa(){
        return this._properties.valorTarifa;
    }

    get valorTarifaFormatadoComVirgula(){
        return this._numberUtil.formatarNumeroComDuasCasasDecimaisComVirgula(this._properties.valorTarifa);
    }

    get latitude(){
        return this._properties.localizacao ? this._properties.localizacao.coordinates[1] : undefined;
    }

    get longitude(){
        return this._properties.localizacao ? this._properties.localizacao.coordinates[0] : undefined;
    }
}
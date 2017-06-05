class Jornada{
    constructor(properties){
        this._properties = properties; 
    }

    carregarLocalizacoes(locationStrategy){
        this._carregarLocalizacaoInicial(locationStrategy);
        this._carregarLocalizacaoFinal(locationStrategy);
    }

    get nomeMotorista(){
        return this._properties.nomeMotorista ? this._properties.nomeMotorista : '';
    }

    get cpfMotorista(){
        return this._properties.cpfMotorista;
    }

    get tempoExcedido(){
        if(this._properties.duracaoMaximaPermitida && this._properties.duracao)
            return this._properties.duracao > this._properties.duracaoMaximaPermitida ? this._properties.duracao - this._properties.duracaoMaximaPermitida : 0;
        else
            return 0;
    }

    get placaVeiculo(){
        return this._properties.placaVeiculo;
    }

    get dataHoraInicial(){
        return this._properties.dataHoraInicial;
    }

    get dataHoraFinal(){
        return this._properties.dataHoraFinal;
    }

    get latitudeInicial(){
        return this._properties.coordenadasInicio ? this._properties.coordenadasInicio.coordinates[0] : null;
    }

    get longitudeInicial(){
        return this._properties.coordenadasInicio ? this._properties.coordenadasInicio.coordinates[1] : null;
    }

    get latitudeFinal(){
        return this._properties.coordenadasFim ? this._properties.coordenadasFim.coordinates[1] : null;
    }

    get longitudeFinal(){
        return this._properties.coordenadasFim ? this._properties.coordenadasFim.coordinates[1] : null;
    }

    get enderecoInicial(){
        return this._properties.enderecoInicial;
    }

    _carregarLocalizacaoInicial(locationStrategy){
        if(this.longitudeInicial && this.latitudeInicial)
            locationStrategy(this.longitudeInicial,this.latitudeInicial)
                .then(endereco => this._properties.enderecoInicial = endereco);
    }

    _carregarLocalizacaoFinal(locationStrategy){
        if(this.longitudeFinal && this.latitudeFinal)
            locationStrategy(this.longitudeFinal,this.latitudeFinal)
                .then(endereco => this._properties.enderecoFinal = endereco);
    }
}
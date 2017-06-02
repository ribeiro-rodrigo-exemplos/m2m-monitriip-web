class Jornada{
    constructor(properties){
        this._properties = properties; 
    }

    get cpfMotorista(){
        return this._properties.cpfMotorista;
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
}
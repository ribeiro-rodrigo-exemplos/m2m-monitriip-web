class Parada{
    constructor(properties){
        this._properties = properties; 
    }

    get motivo(){
        return this._properties.motivoParada ? this._properties.motivoParada.split('_').join(' ').toLowerCase() : '';
    }

    get dataHora(){
        return this._properties.dataHora;
    }

    get latitude(){
        return this._properties.localizacao ? this._properties.localizacao.coordinates[1] : null;
    }

    get longitude(){
        return this._properties.localizacao ? this._properties.localizacao.coordinates[0] : null;
    }
}
/**
 * Created by Rodrigo Ribeiro on 12/07/17.
 */
class EventBusService{

    constructor(){
        this._bus = {};
    }

    on(eventName,listener){
        this._bus[eventName] = this._bus[eventName] ? this._bus[eventName].concat([listener]) : [listener]; 
    }

    emit(eventName,event){
        if(this._bus[eventName])
            this._bus[eventName].forEach(listener => listener(this._clone(event))); 
    }

    _clone(event){
        return JSON.parse(JSON.stringify(event)); 
    }
}

angular.module('monitriip-web')
        .service('EventBusService',EventBusService);
class Interceptor{
    constructor(promise,window){
        this._promise = promise;
        this._window = window;
    }

    request(config){
        console.log('request');
        return config;
    }

    responseError(response){
        console.log('responseError');
    }
}

Interceptor.$inject = ['$q','$window'];

angular.module('monitriip-web')
        .factory('Interceptor',Interceptor);
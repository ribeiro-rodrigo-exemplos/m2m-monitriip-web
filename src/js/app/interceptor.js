let self;

class Interceptor{
    constructor(promise,window){
        self = this;
        self._promise = promise;
        self._window = window;
    }

    request(config){
        config.headers.Authorization = localStorage.token;
        return config;
    }

    responseError(response){
        console.log('responseError');
    }
}

Interceptor.$inject = ['$q','$window'];

angular.module('monitriip-web')
        .factory('Interceptor',Interceptor);
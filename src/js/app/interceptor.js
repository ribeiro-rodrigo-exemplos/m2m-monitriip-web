let self;

class Interceptor{
    constructor(promise,window,m2mconfig){
        self = this;
        self._promise = promise;
        self._window = window;
        self._m2mconfig = m2mconfig;
    }

    request(config){
        if(config.url.match(self._m2mconfig.apiMonitriipPainel))
            config.headers.Authorization = localStorage.token;
        
        return config;
    }

    responseError(response){
        console.log('responseError');
    }
}

Interceptor.$inject = ['$q','$window', 'm2mconfig'];

angular.module('monitriip-web')
        .factory('Interceptor',Interceptor);
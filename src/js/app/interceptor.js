function Interceptor(m2mconfig){

    return {
        request(config){
            if(config.url.match(m2mconfig.apiMonitriipPainel))
                config.headers.Authorization = localStorage.token;
        
            return config;
        },
        responseError(response){
            console.log('responseError');
        }
    };
}

Interceptor.$inject = ['m2mconfig'];

angular.module('monitriip-web')
        .factory('Interceptor',Interceptor);
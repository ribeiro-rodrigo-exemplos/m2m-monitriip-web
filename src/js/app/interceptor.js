let self;

class Interceptor{
    constructor(promise,window){
        self = this;
        self._promise = promise;
        self._window = window;
    }

    request(config){
        let token = self._pegaToken(self._window.location.href);
        
        if(token)
            localStorage.token = token;
        
        config.headers.Authorization = localStorage.token;

        return config;
    }

    _pegaToken(url){
        let param = [];
        let token = "";
        let urlFragmentada = [];
        let paramFragmentado = [];

        if(url){
            urlFragmentada = url.split("?");
        }

        if (urlFragmentada[1]){
            paramFragmentado = urlFragmentada[1].split("&");
        }

        if(paramFragmentado){
            paramFragmentado.forEach(parametro =>{
                if(parametro.indexOf("token") != -1){
                    param = parametro.split("=");
                    token = param[1];
                    return;
                }
            });
        }

        return token;

    }

    responseError(response){
        console.log('responseError');
    }
}

Interceptor.$inject = ['$q','$window'];

angular.module('monitriip-web')
        .factory('Interceptor',Interceptor);
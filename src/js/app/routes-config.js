/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
class RoutesConfig{

    configurarRotas($stateProvider,$urlRouterProvider,$httpProvider){

        $stateProvider.state('painel-viagem',{
            url:'/painel/viagem',
            controller:'PainelViagemController',
            controllerAs:'ctrl',
            templateUrl:'../../views/painel-viagem/painel.html'
        });

        $urlRouterProvider.otherwise('/painel/viagem');
        $httpProvider.interceptors.push('Interceptor');
    }
}


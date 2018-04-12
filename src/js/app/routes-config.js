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

        $stateProvider.state('quantitativo-linha',{
            url:'/quantitativo/linha',
            controller:'PainelViagemController',
            controllerAs:'ctrl',
            templateUrl:'../../views/quantitativo-linha/quantitativo-linha.html'
        });

        $stateProvider.state('quantitativo-empresa',{
            url:'/quantitativo/empresa',
            controller:'PainelViagemController',
            controllerAs:'ctrl',
            templateUrl:'../../views/quantitativo-empresa/quantitativo-empresa.html'
        });

        $urlRouterProvider.otherwise('/quantitativo/empresa');
        $httpProvider.interceptors.push('Interceptor');
    }
}


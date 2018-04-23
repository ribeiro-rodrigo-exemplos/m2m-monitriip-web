/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
angular.module('monitriip-web',[
        'ui.router',
        'FBAngular',
        'highcharts-ng',
        'ngMap',
        'ngSanitize',
        'ngCsv'
    ]).config(['$stateProvider','$urlRouterProvider','$httpProvider',new RoutesConfig().configurarRotas]).
        run(['$rootScope','$state',(rootScope,state) => {
            console.log('monitriip-web rodando....');
            rootScope.state = state;
        }]);
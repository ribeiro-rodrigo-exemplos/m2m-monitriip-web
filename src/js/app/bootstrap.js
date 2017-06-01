/**
 * Created by Rodrigo Ribeiro on 20/04/17.
 */
angular.module('monitriip-web',[
        'ui.router',
        'FBAngular',
        'highcharts-ng',
        'ngMap'
    ]).config(new RoutesConfig().configurarRotas).
        run(($rootScope,$state) => {
            console.log('monitriip-web rodando....');
            $rootScope.state = $state;
        });
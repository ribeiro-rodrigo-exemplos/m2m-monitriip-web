class MapaPopup {
    constructor(map){
        this._map = map;
        this._localizacaoInicial = [];
        this._localizacaoFinal = [];
        this._localizacoes = [];
    }

    montarMapa(detalheViagem){
        this._localizacoes = this._pegaLocalizacoes(detalheViagem);
        this._localizacaoInicial = {'posicao' : `${detalheViagem.localizacaoInicial.coordinates[0]}, ${detalheViagem.localizacaoInicial.coordinates[1]}`};
        this._localizacaoFinal = {'posicao' : `${detalheViagem.localizacaoFinal.coordinates[0]}, ${detalheViagem.localizacaoFinal.coordinates[1]}`};
    }

    _pegaLocalizacoes(detalheViagem){
        let posicoes = [];
        detalheViagem.forEach(viagem =>{
            viagem.localizacoes.forEach(local =>{
                posicoes.push({'posicao' : `${local.localizacao.coordinates[0]}, ${local.localizacao.coordinates[1]}`});
            });
        });

        return posicoes;
    }

    // _addMarker = function(event) {
    //     var ll = event.latLng;
    //     vm.positions.push({pos:[ll.lat(), ll.lng()]});
    // }


    // var vm = this;
    // vm.positions =[
    //     {pos:[40.71, -74.21]},
    //     {pos:[41.72, -73.20]},
    //     {pos:[42.73, -72.19]},
    //     {pos:[43.74, -71.18]},
    //     {pos:[44.75, -70.17]},
    //     {pos:[45.76, -69.16]},
    //     {pos:[46.77, -68.15]}
    // ];
    // vm.addMarker = function(event) {
    //     var ll = event.latLng;
    //     vm.positions.push({pos:[ll.lat(), ll.lng()]});
    // }



    // <h3>With zoom-to-include-markers='auto'</h3>
    // Please click on map to add more markers
    // <ng-map zoom="11" center="[40.74, -74.18]"
    //     scrollwheel="false"
    //     zoom-to-include-markers="auto"
    //     on-click="vm.addMarker()">
    //     <marker ng-repeat="p in vm.positions"
    //     position="{{p.pos}}" title="pos: {{p.pos}}"></marker>
    // </ng-map>






    centralizar(latitude,longitude){
        this._map
            .then(map => map.setCenter(new google.maps.LatLng(latitude,longitude)));
    }

    zoom(nivel){
       this._map
            .then(map => map.setZoom(nivel));
    }


}

MapaPopup.$inject = ['NgMap'];

angular.module('monitriip-web')
        .service('MapaPopup', MapaPopup);


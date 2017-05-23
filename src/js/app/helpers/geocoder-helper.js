class GeocoderHelper{
    constructor(promise){
        this._promise = promise; 
        this._osm = GeocoderJS.createGeocoder('openstreetmap');
    }

    obterEndereco(latitude,longitude){
        this._osm.geodecode(longitude,latitude,result => console.log(result));
    }
}

GeocoderHelper.$inject = ['$q'];

angular.module('monitriip-web')
        .service('GeocoderHelper',GeocoderHelper);
class GeocoderHelper{
    constructor(httpClient){
        this._httpClient = httpClient;
        this._URL = 'http://nominatim.openstreetmap.org/reverse';
    }

    obterEndereco(longitude,latitude){
        const query = {
            format:'json',
            lat:latitude,
            lon:longitude,
            addressdetails:1,
            zoom:18 
        };

        return this._httpClient.get(this._URL,{params:query})
                    .then(result => this._formatarEndereco(result.data));
    }

    _formatarEndereco(result){
        if(result.error)
            return;

        const address = result.address;
        return `${address.road}, ${address.suburb}, ${address.city}, ${address.state}`;
    }
}

GeocoderHelper.$inject = ['$http'];

angular.module('monitriip-web')
        .service('GeocoderHelper',GeocoderHelper);
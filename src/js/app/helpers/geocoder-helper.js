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
        let rua = this._validaEndereco(address.road);
        let bairro = this._validaEndereco(address.suburb);
        let cidade = this._validaEndereco(address.city);
        let estado = this._validaEndereco(address.state, true);

        return `${rua} ${bairro} ${cidade} ${estado}`;
    }

    _validaEndereco(campo, ultimoCampo){
        if(!ultimoCampo)
            return campo ? campo + ", " : "";
        else
            return  campo ? campo : "";
    }
}

GeocoderHelper.$inject = ['$http'];

angular.module('monitriip-web')
        .service('GeocoderHelper',GeocoderHelper);
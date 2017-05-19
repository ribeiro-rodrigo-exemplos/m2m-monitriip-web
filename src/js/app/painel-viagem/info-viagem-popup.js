class InfoViagemPopup{
    constructor(){
        this.detalheViagem = {};
        this.velocidadeMedia = 0;
        this._dateUtil = new DateUtil();
    }

    obterDetalheViagem(detalheViagem){
        $(".popup").removeClass("none");
        
        this.detalheViagem = detalheViagem;
        let totalKm = this.detalheViagem.localizacoes.length;
        
        this.velocidadeMedia = (this.detalheViagem.localizacoes.reduce((total, localizacao) => total + localizacao.velocidade, 0)) / totalKm;

        this.detalheViagem.bilhetes = this.detalheViagem.bilhetes.map(bilhete =>{
            bilhete.dataHoraEvento = this._dateUtil.formatarDataHora(bilhete.dataHoraEvento);
            bilhete.coordenadasFormatadas = this._formataCoordenadas(bilhete.localizacao.coordinates[0], bilhete.localizacao.coordinates[1]);
            return bilhete;
        });

        this.detalheViagem.paradas = this.detalheViagem.paradas.map(parada =>{
            parada.dataHora = this._dateUtil.formatarDataHora(parada.dataHora);
            parada.motivoParada = parada.motivoParada.replace("_", " ");
            parada.coordenadasFormatadas = this._formataCoordenadas(parada.localizacao.coordinates[0], parada.localizacao.coordinates[1]);
            return parada;
        }); 
        
    }

    _formataCoordenadas(x, y){
        return x + " / " + y;
    }

    AbrirDetalhes(campo){
        //alert(campo);
        $('.bilhete-'+campo).next(".toggle_table").toggleClass("none");
    }
}

angular.module('monitriip-web')
        .service('InfoViagemPopup', InfoViagemPopup);

class PainelViagens{
    constructor(){
        // this.id = "";
        // this.descricaoLinha = "";
        // this.tipoViagem = "";
        // this.totalKm = 0;
        // this.totalTempo = 0;
        // this.totalBilhetes = 0;
        // this.totalParadas = 0;
        this.viagens = [];
    }

    atualizar(event){
        event.viagens.forEach(viagem =>{
            this.viagens.push(viagem);
        });      
    }
}

angular.module('monitriip-web')
        .service('PainelViagens', PainelViagens);
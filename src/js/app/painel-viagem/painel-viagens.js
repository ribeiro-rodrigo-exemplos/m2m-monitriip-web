
class PainelViagens{
    constructor(){
        this._dateUtil = new DateUtil();
        this.viagens = [];
    }

    
    formatarData(data){
        return this._dateUtil.obterDiaEMes(data);
    }

    formatarNumero(numero){
        return parseFloat(numero).toFixed(2);
    }

    atualizar(event){
                   
        let dias = [];
        
        event.dias = event.dias.map(dia =>{
            dia.data = this.formatarData(dia.data);
            dia.totalizadores.totalQuilometragem = this.formatarNumero(dia.totalizadores.totalQuilometragem);
            
            dia.viagens = dia.viagens.map(viagem =>{
                viagem.totalKm = this.formatarNumero(viagem.totalKm);
                return viagem;
            });
            
            return dia;
        });

        this.viagens = event;
    }
}

angular.module('monitriip-web')
        .service('PainelViagens', PainelViagens);
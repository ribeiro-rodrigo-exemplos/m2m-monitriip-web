
class ExtratoPorDia{
    constructor(document){
        this._dateUtil = new DateUtil();
        this.viagens = [];
        this._document = document[0];
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

    minimizar(index){
        let element = this._document.querySelector(`.minimizar-${index}`);
        element.classList.toggle('none');
    }
}

ExtratoPorDia.$inject = ['$document'];

angular.module('monitriip-web')
        .service('ExtratoPorDia', ExtratoPorDia);
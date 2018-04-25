class AlertService{
    exibirAlert(mensagem,ctrl){
        let alert = document.getElementById('alert');
        ctrl.alert = {mensagem:mensagem};
        alert.classList.remove('alerts-container--active');
        setTimeout(() => alert.classList.add('alerts-container--active'),10);
    }
}

angular.module('monitriip-web')
        .service('AlertService',AlertService);


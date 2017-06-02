class Viagem{
    constructor(periodos){
        this._periodos = periodos;

        this._quantidadeDeMotoristas = 0;
        this._quantidadeDeVeiculos = 0;
        this._totalKm = 0;
        this._direcaoContinuaMaxima = 0;
        this._calculoVelocidades = {};
        this._bilhetes = [];
        this._paradas = [];
        this._servicos = [];
        this._coordenadasPercurso = [];
        this._localizacaoInicial = {};
        this._localizacaoFinal = {};
        this._LAT = 0;
        this._LONG = 1;

        if(periodos && periodos.length)
            this._montarViagem(); 
    }

    get dataHoraInicial(){
        return this._dataHoraInicial;
    }

    get dataHoraFinal(){
        return this._dataHoraFinal;
    }

    get quantidadeDeMotoristas(){
        return this._quantidadeDeMotoristas;
    }

    get quantidadeDeVeiculos(){
        return this._quantidadeDeVeiculos;
    }

    get totalKm(){
        return this._totalKm;
    }

    get direcaoContinuaMaxima(){
        return this._direcaoContinuaMaxima;
    }

    get velocidadeMaxima(){
        return this._calculoVelocidades.velocidadeMaxima;
    }

    get velocidadeMinima(){
        return this._calculoVelocidades.velocidadeMinima;
    }

    get velocidadeMedia(){
        return this._calculoVelocidades.velocidadeMedia;
    }

    get bilhetes(){
        return this._bilhetes;
    }

    get paradas(){
        return this._paradas; 
    }

    get quantidadeDeParadas(){
        return this._paradas.length;
    }

    get quantidadeDeBilhetes(){
        return this._bilhetes.length;
    }

    get servicos(){
        return this._servicos; 
    }

    get identificacaoLinha(){
        return this._identificacaoLinha;
    }

    get sentidoLinha(){
        return this._sentidoLinha;
    }

    get duracaoEmMinutos(){
        return this._duracaoEmMinutos ? this._duracaoEmMinutos : 0;
    }

    get tipoViagem(){
        return this._tipoViagem;
    }

    get imei(){
        return this._imei; 
    }

    get pdop(){
        return this._pdop; 
    }

    get descricaoDaLinha(){
        return this._descricaoDaLinha;
    }

    get coordenadasPercurso(){
        return this._coordenadasPercurso;
    }
    
    get localizacaoInicial(){
        return this._localizacaoInicial;
    }

    get localizacaoFinal(){
        return this._localizacaoFinal;
    }
    

    _montarViagem(){

        let primeiroPeriodo = this._periodos[0];
        let ultimoServico = this._periodos[this._periodos.length-1];

        this._dataHoraInicial = primeiroPeriodo.dataHoraInicial;
        this._dataHoraFinal = ultimoServico.dataHoraFinal;

        this._identificacaoLinha = primeiroPeriodo.identificacaoLinha;
        this._descricaoDaLinha = primeiroPeriodo.descricaoDaLinha;
        this._sentidoLinha = primeiroPeriodo.sentidoLinha;
        this._tipoViagem = primeiroPeriodo.tipoViagem;
        this._imei = primeiroPeriodo.imei; 
        this._pdop = primeiroPeriodo.pdop; 

        this._servicos = this._periodos.map(servico => {
            return {
                placaVeiculo:servico.placaVeiculo,
                cpfMotorista:servico.cpfMotorista,
                horaInicio:servico.dataHoraInicial,
                horaFim:servico.dataHoraFinal
            };
        });

        this._quantidadeDeMotoristas = [...new Set(this._servicos.map(t => t.cpfMotorista)).values()].length;
        this._quantidadeDeVeiculos = [...new Set(this._servicos.map(t => t.placaVeiculo)).values()].length;

        this._totalKm = this._periodos.reduce((total,servico) => total+servico.totalKm,0);

        this._direcaoContinuaMaxima = this._periodos.reduce((maior,servico) => 
            servico.direcaoContinua.tempoMaximo > maior ? servico.direcaoContinua.tempoMaximo :maior,0);

        this._duracaoEmMinutos = this._periodos.reduce((total,servico) => total+servico.duracao ? servico.duracao : 0,0);
    
        this._calculoVelocidades = this._calcularVelocidades();

        this._bilhetes = this._periodos.map(periodo => periodo.bilhetes) 
                                .reduce((acc,bilhetes) => {
                                    bilhetes.forEach(bilhete => acc.push(bilhete));
                                    return acc;
                                },[]);

        this._paradas = this._periodos.map(periodo => periodo.paradas) 
                        .reduce((acc,paradasProperties) => {
                            paradasProperties.forEach(properties => acc.push(new Parada(properties)));
                            return acc;
                        },[]);
        

        this._localizacaoInicial = `${primeiroPeriodo.localizacaoInicial.coordinates[this._LAT]}, ${primeiroPeriodo.localizacaoInicial.coordinates[this._LONG]}`;
        this._localizacaoFinal = `${ultimoServico.localizacaoFinal.coordinates[this._LAT]}, ${ultimoServico.localizacaoFinal.coordinates[this._LONG]}`;
        
        this._coordenadasPercurso.push([primeiroPeriodo.localizacaoInicial.coordinates[this._LAT], primeiroPeriodo.localizacaoInicial.coordinates[this._LONG]]);

        this._periodos.map(periodo =>{
            periodo.localizacoes.forEach(local =>{
                if(local && local.localizacao)
                    this._coordenadasPercurso.push([local.localizacao.coordinates[this._LAT], local.localizacao.coordinates[this._LONG]]);
            });
        });

        this._coordenadasPercurso.push([ultimoServico.localizacaoFinal.coordinates[this._LAT], ultimoServico.localizacaoFinal.coordinates[this._LONG]]);
   
    }

    _calcularVelocidades(){
        let calculoVelocidade = {};

        let velocidades = this._periodos.map(servico => servico.localizacoes)
                                        .reduce((acc,localizacoes) => {
                                            localizacoes.forEach(l => {
                                                if(typeof(l.velocidade) == 'number')
                                                    acc.push(l.velocidade);
                                            });
                                            return acc; 
                                        },[]);

        if(velocidades.length){
            calculoVelocidade.velocidadeMaxima = Math.max.apply(null,velocidades);
            calculoVelocidade.velocidadeMinima = Math.min.apply(null,velocidades); 
            calculoVelocidade.velocidadeMedia = velocidades.reduce((acumulador,velocidade) => acumulador+velocidade,0)/velocidades.length;
        } 

        return calculoVelocidade; 
    }

    _obterDataHoraInicial(){
        return this._servicosDaViagem[0].dataHoraInicial;
    }

    _obterDataHoraFinal(){
        return this._servicosDaViagem[this._servicosDaViagem.length-1].dataHoraFinal;
    }
}

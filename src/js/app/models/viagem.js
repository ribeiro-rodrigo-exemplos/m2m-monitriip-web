class Viagem{
    constructor(periodos, geocoderHelper){

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
        this._LAT = 1;
        this._LONG = 0;
        this._geocoderHelper = geocoderHelper;

        if(periodos && periodos.length)
            this._montarViagem(periodos); 
    }

    get dataHoraInicial(){
        return this._primeiroPeriodo.dataHoraInicial;
    }

    get dataHoraFinal(){
        return this._ultimoPeriodo.dataHoraFinal;
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
        return this._primeiroPeriodo.identificacaoLinha;
    }

    get sentidoLinha(){
        return this._primeiroPeriodo.sentidoLinha;
    }

    get duracaoEmMinutos(){
        return this._duracaoEmMinutos ? this._duracaoEmMinutos : 0;
    }

    get tipoViagem(){
        return this._tipoViagem;
    }

    get imei(){
        return this._primeiroPeriodo.imei; 
    }

    get pdop(){
        return this._primeiroPeriodo.pdop; 
    }

    get descricaoDaLinha(){
        return this._primeiroPeriodo.descricaoDaLinha;
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

    get enderecoLocalizacaoInicial(){
        return this._enderecoLocalizacaoInicial;
    }

    get enderecoLocalizacaoFinal(){
        return this._enderecoLocalizacaoFinal;
    }
    

    _montarViagem(periodos){

        this._periodos = periodos;
        this._primeiroPeriodo = periodos[0]; 
        this._ultimoPeriodo = periodos[periodos.length -1];

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
                                .reduce((acc,bilhetesProperties) => {
                                    bilhetesProperties.forEach(properties => acc.push(new Bilhete(properties)));
                                    return acc;
                                },[]);

        this._paradas = this._periodos.map(periodo => periodo.paradas) 
                        .reduce((acc,paradasProperties) => {
                            paradasProperties.forEach(properties => acc.push(new Parada(properties)));
                            return acc;
                        },[]);
        

        this._coordenadasPercurso = this._periodos
                                        .map(periodo => periodo.localizacoes)
                                        .reduce((acc,localizacoesPorPeriodo) => {
                                            localizacoesPorPeriodo.forEach(localizacao => acc.push(localizacao));
                                            return acc;
                                        },[]);

        this._definirLocalizacaoInicial();
        this._definirLocalizacaoFinal();
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

    _definirLocalizacaoInicial(){
        if(this._naoPossuiLocalizacaoInicialValida())
            this._definirPrimeiraLocalizacaoValida(this._localizacaoInicial,this._coordenadasPercurso);
        else
            this._localizacaoInicial = this._primeiroPeriodo.localizacaoInicial.coordinates;

        this._geocoderHelper.obterEndereco(this.localizacaoInicial[this._LONG],this.localizacaoInicial[this._LAT])
            .then(endereco => this._enderecoLocalizacaoInicial = endereco);
    }

    _definirLocalizacaoFinal(){
        if(this._naoPossuiLocalizacaoFinalValida())
            this._definirPrimeiraLocalizacaoValida(this._localizacaoFinal,this._coordenadasPercurso.reverse());
        else
            this._localizacaoFinal = this._ultimoPeriodo.localizacaoFinal.coordinates;

        this._geocoderHelper.obterEndereco(this.localizacaoFinal[this._LONG],this.localizacaoFinal[this._LAT])
            .then(endereco => this._enderecoLocalizacaoFinal = endereco);
    }

    _formatarCoordenada(coordenada){
        return `${coordenada.coordinates[this._LAT]}, ${coordenada.coordinates[this._LONG]}`;
    }

    _naoPossuiLocalizacaoInicialValida(){
        return !this._primeiroPeriodo.localizacaoInicial || !this._primeiroPeriodo.localizacaoInicial.coordinates ||
        !this._primeiroPeriodo.localizacaoInicial.coordinates[this._LAT] || !this._primeiroPeriodo.localizacaoInicial.coordinates[this._LONG];
    }

    _naoPossuiLocalizacaoFinalValida(){
        return !this._ultimoPeriodo.localizacaoFinal || !this._ultimoPeriodo.localizacaoFinal.coordinates || 
        !this._ultimoPeriodo.localizacaoFinal.coordinates[this._LAT] || !this._ultimoPeriodo.localizacaoFinal.coordinates[this._LONG];
    }

    _definirPrimeiraLocalizacaoValida(localizacao,localizacoes){
        localizacoes.some(loc => {
            let coordinates = loc.localizacao.coordinates;
            if(coordinates[this._LAT] && coordinates[this._LONG]){
                localizacao = coordinates;
                return true; 
            }
        });
    }

    _obterDataHoraInicial(){
        return this._servicosDaViagem[0].dataHoraInicial;
    }

    _obterDataHoraFinal(){
        return this._servicosDaViagem[this._servicosDaViagem.length-1].dataHoraFinal;
    }
}

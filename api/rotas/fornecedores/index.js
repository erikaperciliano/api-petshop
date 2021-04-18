const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;


roteador.options('/', (req, res) => {
    res.set('Access-Control-Allow-Method', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
});

roteador.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
    
        await fornecedor.criar();

        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['empresa']
        );
        res.send(
            serializador.serializar(fornecedor)
        );
    }catch(erro){
        next(erro);
    }
});

roteador.get('/', async(req, res) =>{
    const resultados = await TabelaFornecedor.listar();
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type'),
        ['empresa']
    );
    res.send(
        serializador.serializar(resultados)
    );
});

roteador.options('/:idFornecedor', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
});

roteador.get('/:idFornecedor', async(req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id : id});
    
        await fornecedor.carregar();
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        );

        res.send(
            serializador.serializar(fornecedor)
        )
    }catch(erro){
        next(erro);
    }
});


roteador.put('/:idFornecedor', async(req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
        
        // junta vários obj em um só
        const dados = Object.assign({}, dadosRecebidos, {id: id })

        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        );
        
        res.send(
            serializador.serializar(fornecedor)
        )
    }catch(erro){
        next(erro);
        
    }
});

roteador.delete('/:idFornecedor', async(req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});

        await fornecedor.carregar();
        await fornecedor.remover();
        
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        );
        
        res.send(
            serializador.serializar(fornecedor)
        )

    }catch(erro){
        next(erro);
    }
});

const roteadorProdutos = require('./produtos');

const verificarFornecedor = async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});

        await fornecedor.carregar();
        //injeta fornecedor dentro da requisição
        req.fornecedor = fornecedor;
        next();
    }catch(erro){
        next(erro);
    }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos);

module.exports = roteador;
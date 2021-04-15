const roteador = require('express').Router({mergeParams: true});// junta os parâmetros do roteador que está acima c/ oq está sendo utilizado agora
const Tabela = require('./TabelaProduto');
const Produto = require('./Produto');

roteador.post('/', async (req, res, next) => {

    try{
        const idFornecedor = req.fornecedor.id;
        const corpo = req.body;
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor});
        const produto = new Produto(dados);

        await produto.criar();
        res.status(201);
        res.send(produto);
    }catch(erro){
        next(erro);
    }
    
});

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.fornecedor.id);

    res.send(
        JSON.stringify(produtos)
    )
});

roteador.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor : req.fornecedor.id
    }

    const produto = new Produto(dados);
    await produto.apagar();
    
    res.status(204);
    res.end();
});


module.exports = roteador;
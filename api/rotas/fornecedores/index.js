const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');


roteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
    
        await fornecedor.criar();
        res.send(JSON.stringify(fornecedor));
    }catch(erro){
        res.status(400);
        res.send({
            mesagem: erro.message
        });
    }
});

roteador.get('/', async(req, res) =>{
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
});

roteador.get('/:idFornecedor', async(req, res) =>{
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id : id});
    
        await fornecedor.carregar();
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch(erro){
        res.status(404);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

roteador.put('/:idFornecedor', async(req, res) =>{
    try {
        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
        
        // junta vários obj em um só
        const dados = Object.assign({}, dadosRecebidos, {id: id })

        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch(erro){
        res.status(404);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

roteador.delete('/:idFornecedor', async(req, res) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});

        await fornecedor.carregar();
        await fornecedor.remover();
        
        res.send(JSON.stringify(fornecedor));

    }catch(erro){
        res.status(404);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});



module.exports = roteador;
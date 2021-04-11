const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const NaoEncontrado = require('./erros/NaoEncontrados');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');

app.use(bodyParser.json());

const roteador = require('./rotas/fornecedores');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');

app.use('/api/fornecedores', roteador);
app.use((erro, req, res, next) => {

    let status = 500;

    if(erro instanceof NaoEncontrado){
        status = 404;
    }
    
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status = 400;
    }

    if(erro instanceof ValorNaoSuportado){
        status = 406;
    }

    res.status(status);
    res.send(JSON.stringify({
        mensagem: erro.message,
        id: erro.idErro
    }));
})


app.listen(3000, () => console.log('API Functionando!'));
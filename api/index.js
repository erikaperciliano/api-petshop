const express = require('express');
const app = express();
const bodyParser = require('body-parser');




app.use(bodyParser.json());

const roteador = require('./rotas/fornecedores');
app.use('/api/fornecedores', roteador);

app.listen(3000, () => console.log('API Functionando!'));
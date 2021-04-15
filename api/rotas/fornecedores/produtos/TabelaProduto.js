const Modelo = require('./ModeloTabelaProduto')

module.exports = {

    inserir(dados){
        return Modelo.create(dados);
    },

    listar(idFornecedor){
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
        })
    },

    async pegarPorId(idProduto, idFornecedor){
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true //volta um obj puro em js
        })

        if(!encontrado){
            throw new Error('Produto não foi encontrado!');
        }

        return encontrado;
    },   

    remover(idProduto, idFornecedor){
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }
   

}
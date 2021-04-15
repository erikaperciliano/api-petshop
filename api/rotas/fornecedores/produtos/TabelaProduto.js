const Modelo = require('./ModeloTabelaProduto')

module.exports = {

    inserir(dados){
        return Modelo.create(dados);
    },

    listar(idFornecedor){
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
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
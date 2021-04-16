const Modelo = require('./ModeloTabelaProduto');
const instancia = require('../../../banco-de-dados');

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

    atualizar(dadosDoProduto, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoProduto
            }
        )
    },

    subtrair(idProduto, idFornecedor, campo, quantidade){
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })

            produto[campo] = quantidade;
            await produto.save(); // pede para o sequelize salvar esse obj no banco

            return produto;
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